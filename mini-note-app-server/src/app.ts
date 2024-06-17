import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import v1Route from "./api/v1";
import { errorHandlerMiddleware, notFoundMiddleware } from "./middlewares";

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

app.use("/api/v1", v1Route)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export default app;
