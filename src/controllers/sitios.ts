// Importar los modelos necesarios
import { Request, Response } from "express";
import sequelize from "../db/connection";
import {siteModel, visitModel} from "../models";

// Definir el controlador para crear sitios
export const createSite = async (req: Request, res: Response) => {
    const { nombre, direccion, descripcion } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const newSite = await siteModel.create(
            {
                nombre,
                direccion,
                descripcion
            },
            { transaction }
        );

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: "Sitio creado correctamente",
            site: newSite
        });
    } catch (error: any) {
        await transaction.rollback();

        return res.status(500).json({
            success: false,
            message: "Error al crear el sitio",
            error: error.message
        });
    }
};
export const getSitesVisitedByUser = async (req: Request, res: Response) => {
    const userId = req.params.userId; // Supongamos que recibimos el ID del usuario como parámetro en la URL

    try {
        // Buscar todas las visitas del usuario especificado
        const visits = await visitModel.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: siteModel, // Incluir el modelo de sitio para obtener la información del sitio
                attributes: ['id', 'nombre', 'direccion', 'descripcion'] // Especificar los atributos que quieres recuperar del sitio
            }]
        });

        // Si no se encontraron visitas para el usuario especificado
        if (!visits || visits.length === 0) {
            return res.status(404).json({
                success: false,
                message: "El usuario especificado no ha visitado ningún sitio"
            });
        }

        // Extraer la información de los sitios de las visitas
        const visitedSites = visits.map(visit => visit.site_id);

        // Respuesta exitosa con la lista de sitios visitados
        return res.status(200).json({
            success: true,
            message: "Lista de sitios visitados por la persona",
            visitedSites: visitedSites
        });
    } catch (error: any) {
        // Respuesta de error
        return res.status(500).json({
            success: false,
            message: "Error al obtener la lista de sitios visitados por la persona",
            error: error.message
        });
    }
};
