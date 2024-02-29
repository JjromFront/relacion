import { Sequelize } from "sequelize";

const sequelize = new Sequelize('relacion', 'root', 'root12345', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize    