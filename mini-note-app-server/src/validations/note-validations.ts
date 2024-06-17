import z from "zod";

export const statusSchema = z.boolean({ required_error : "status is required", invalid_type_error : "status is invalid"})

export const createNoteSchema = z.object({
    title: z.string({ required_error: "title is required", invalid_type_error: "title is invalid" }).min(2, "Title is too short"),
    status : statusSchema.default(false),
})

export const updateNoteSchema = z.object({
    status : statusSchema
})

export const noteIdParamSchema = z.object({
    id : z.coerce.number({
        required_error : "note id is missing",
        invalid_type_error : "invalid note id"
    })
})
