import express, { Application, Router } from "express";
import { createVisit, getVisitorsForSite } from "../controllers/visit";

export const visitApi = (app: Application) => {
    const router: Router = express.Router();
    app.use("/visit", router);

    router.post("/", createVisit);
    router.get("/visitors-for-site", getVisitorsForSite)
};
