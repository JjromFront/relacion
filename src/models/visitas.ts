import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { siteModel, userModel, visitModel } from ".";

class Visit extends Model {
    public id!: number;
    public fecha!: Date;
    public site_id!: number;
    public user_id!: number;

    static associate(models: any) {
        Visit.hasMany(models.visitModel, {
            foreignKey: "siteId",
        });

        Visit.belongsTo(models.userModel, {
            foreignKey: "user_id"
        })
    }
}

Visit.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        site_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Sites",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Visit",
        tableName: "Visits",
        timestamps: false,
    }
);

Visit.associate = (models: any) => {
    Visit.belongsTo(models.siteModel, {
        foreignKey: "site_id",
    });

    Visit.belongsTo(userModel, {
        foreignKey: "user_id",
        as: "users"
    });
};

export default Visit;
