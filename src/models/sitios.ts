import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import { visitModel } from ".";


class Site extends Model {
  public id!: number;
  public nombre!: string;
  public direccion!: string;
  public descripcion!: string;

  // Método para definir asociaciones
  static associate(models: any) {
    Site.hasMany(models.visitModel, {
      foreignKey: "siteId",
      as: "visits", // Alias para acceder a las visitas asociadas
    });
  }
}

Site.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Site",
    tableName: "Sites",
    timestamps: false,
  }
);

Site.associate = (models: any) => {
    Site.hasMany(models.visitModel, {
        foreignKey: "site_id"
    })
}
export default Site;
