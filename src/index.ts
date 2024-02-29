import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import config from "./config";
import sequelize from "./db/connection";
import { siteModel, userModel, visitModel } from "./models";

import { userApi } from "./router/user";
import { siteApi } from "./router/site";
import { visitApi } from "./router/visit";
// import userApi from "./router/user";

dotenv.config()

sequelize.sync()
    .then(() => {
        console.log("Modelos sincronizados correctamente")
    })


sequelize
    .authenticate()
    .then(() => {
        console.log("Base de datos conectada exitosamente")
    })
    .catch((err) => {
        console.log("Error al conectar la base de datos, ", err)
    })


siteModel.sync()
visitModel.sync()
userModel.sync()

const app: Application = express();
app.use(bodyParser.json());

userApi(app);
visitApi(app);
siteApi(app);

app.listen(3000, () => {
  console.log("listen port", 3000);
});
