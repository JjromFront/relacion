import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { visitModel } from ".";

class Users extends Model {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public password!: string;
    public profile!: number;
    public estado!: number;

    static associate(models: any) {
        Users.hasMany(models.visitModel, {
            foreignKey: 'userId'
        });
    }
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        profile: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        estado: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        modelName: "Users",
        timestamps: false,
    }
);


export default Users;
