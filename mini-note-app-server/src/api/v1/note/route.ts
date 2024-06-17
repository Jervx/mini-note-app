import { Router } from "express";

import { validationMiddleware } from "../../../middlewares";
import { getAllNote, createNote, updateNote, deleteNote } from "../../../controllers/note-controller";
import { createNoteSchema, noteIdParamSchema, updateNoteSchema } from "../../../validations/note-validations";

const noteRoute = Router();

noteRoute.get("/", getAllNote);

noteRoute.post("/", validationMiddleware({ body: createNoteSchema }), createNote );

noteRoute.put("/:id", validationMiddleware({ body: updateNoteSchema, params: noteIdParamSchema }), updateNote);

noteRoute.delete("/:id", validationMiddleware({ params : noteIdParamSchema }), deleteNote);

export default noteRoute;
