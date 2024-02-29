// Importar los modelos necesarios
import { Request, Response } from "express";
import sequelize from "../db/connection";
import { visitModel, userModel, siteModel } from "../models";

// Definir el controlador para crear visitas a sitios
export const createVisit = async (req: Request, res: Response) => {
    const { fecha, site_id, user_id } = req.body;

    const userExists = await userModel.findByPk(user_id);
    if (!userExists) {
        return res.status(404).json({
            success: false,
            message: "El usuario especificado no existe"
        });
    }

    const siteExists = await siteModel.findByPk(site_id);
    if (!siteExists) {
        return res.status(404).json({
            success: false,
            message: "El sitio especificado no existe"
        });
    }

    const transaction = await sequelize.transaction();

    try {
        const newVisit = await visitModel.create(
            {
                fecha,
                site_id,
                user_id
            },
            { transaction }
        );

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Visita creada correctamente",
            visit: newVisit
        });
    } catch (error: any) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: "Error al crear la visita",
            error: error.message
        });
    }
};

export const getVisitorsForSite = async (req: Request, res: Response) => {
    const siteId = req.query.siteId; 

    try {
        // Buscar todas las visitas para el sitio especificado
        const visits = await visitModel.findAll({
            where: {
                site_id: siteId
            },
            include: [{
                model: userModel, // Aquí debería ser userModel en lugar de userModel
                attributes: ['id', 'nombre', 'email', 'profile', 'estado'] 
            }]
        });
        if (!visits || visits.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron visitas para el sitio especificado"
            });
        }

        const visitors = visits.map(visit => (visit as any).user);

        return res.status(200).json({
            success: true,
            message: "Lista de personas que visitaron el sitio",
            visitors: visitors
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener la lista de visitantes del sitio",
            error: error.message
        });
    }
};
