import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import IRequestValidators from "src/interfaces/request-validator";

export const notFoundMiddleware = (_ : Request, res : Response, next : NextFunction) => {
    res.status(404);
    next(new Error("🪹 - Not Found"));
}

export const errorHandlerMiddleware = (err : Error, _req : Request, res : Response, _next : NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const { NODE_ENV } = process.env;

    if (err instanceof ZodError)
        return res.json({ message: err.issues[0].message })

    return res.status(statusCode).json({
        message: err.message,
        stack: NODE_ENV === "development" ? err.stack : "⛔"
    })
}

export const validationMiddleware = ({ body, params }: IRequestValidators) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (params) req.params = await params.parseAsync(req.params);
            if (body) req.body = await body.parseAsync(req.body);
            next();
        } catch (err) {
            res.status(422)
            next(err);
        }
    }
}
