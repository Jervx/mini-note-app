import { AnyZodObject } from "zod";

export default interface IRequestValidators {
    body? : AnyZodObject,
    params? : AnyZodObject,
}
