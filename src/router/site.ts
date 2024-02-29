import express, { Application, Router } from "express";
import { createSite, getSitesVisitedByUser } from "../controllers/sitios";

export const siteApi = (app: Application) => {
    const router: Router = express.Router();
    app.use("/site", router);

    router.post("/", createSite);
    router.get("/site-visited-by-user", getSitesVisitedByUser)
};
