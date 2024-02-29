import express, { Application, Router } from "express";
import { creatUser } from "../controllers/user";

export const userApi = (app: Application) => {
    const router: Router = express.Router();
    app.use("/user", router);

    router.post("/", creatUser);
};
