import { Request, Response } from "express";
import sequelize from "../db/connection";
import { userModel } from "../models";

export const creatUser = async (req: Request, resp: Response) => {
    const transaction = await sequelize.transaction();
    try {
        const { nombre, email, password, profile } = req.body;

        if (!nombre || !email || !password) {
            await transaction.rollback();
            return resp.status(400).json({
                msg: "Todos los campos son obligatorios.",
                status: false,
            });
        }

        const userCreated = await userModel.create(
            { nombre, email, password, profile },
            {
                transaction,
            }
        );

        await transaction.commit();
        return resp.status(200).json({
            status: true,
            msg: "Usuario registrado",
            userCreated,
        });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return resp.status(500).json({
            msg: "Error en el servidor",
            status: false,
        });
    }
};


