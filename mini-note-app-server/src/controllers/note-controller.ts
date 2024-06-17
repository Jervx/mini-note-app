import { ResultSetHeader } from "mysql2";
import { NextFunction, Request, Response } from "express";

import { dbPool } from "../lib/database";
import { INote, INoteQueryResult } from "../interfaces/note";

export const getAllNote = async (_: Request, res: Response<{ notes : INote[] }>, next: NextFunction) => {
    try {
        const [notes] = await dbPool.promise().query<INoteQueryResult[]>("SELECT * FROM note ORDER BY createdAt DESC");
        return res.json({ notes : notes .map((note) => ({ ...note, status: !!note.status })) })
    } catch (e) {
        next(e);
    }
}

export const createNote = async (req: Request, res: Response<INote>, next: NextFunction) => {
    try {
        const { title } = req.body;
        const [created] = await dbPool.promise().execute<ResultSetHeader>(
            'INSERT INTO `note`(`title`)values(?)',
            [title]
        );
        let [notes] = await dbPool.promise().execute<INoteQueryResult[]>(
            'SELECT * FROM `note` WHERE `id` = ?',
            [created.insertId]
        );

        notes = notes.map((note) => ({ ...note, status: !!note.status }))

        return res.json({ ...notes[0] })
    } catch (e) {
        next(e);
    }
}

export const updateNote = async ({ body, params }: Request, res: Response, next: NextFunction) => {
    try {
        const [result] = await dbPool.promise().execute<ResultSetHeader>(
            'UPDATE `note` SET `status` = ?, updatedAt = ? WHERE `id` = ?',
            [body.status, new Date(), params.id]
        );

        if(result.affectedRows === 0){
            res.status(404)
            throw new Error("Note to update doesn't exist")
        }

        let [notes] = await dbPool.promise().execute<INoteQueryResult[]>(
            'SELECT * FROM `note` WHERE `id` = ?',
            [params.id]
        );

        notes = notes.map((note) => ({ ...note, status: !!note.status }))

        return res.status(200).json({ ...notes[0] })
    } catch (e) {
        next(e);
    }
}


export const deleteNote = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
        await dbPool.promise().execute<ResultSetHeader>(
            'DELETE FROM `note` WHERE `id` = ?', 
            [params.id]
        );

        return res.status(204).send();
    } catch (e) {
        next(e);
    }
}
