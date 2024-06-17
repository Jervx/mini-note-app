import { RowDataPacket } from "mysql2";

export interface INote {
    id : number,
    title : string,
    status : boolean,
    updatedAt? : Date | null,
    createdAt : Date
}

export interface INoteQueryResult extends INote, RowDataPacket { }
