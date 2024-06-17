import { Router } from "express";
import noteRoute from "./note/route";

const v1Route = Router();

v1Route.use("/note", noteRoute)

export default v1Route;
