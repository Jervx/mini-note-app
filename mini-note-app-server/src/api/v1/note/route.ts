import { Router } from "express"; 

const noteRoute = Router();

noteRoute.get("/", (req, res)=> {
    res.status(200).json("ok");
})

export default noteRoute;
