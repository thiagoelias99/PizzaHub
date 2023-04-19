import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../../database/knex/providers";
import { IUser } from "../../../models";
import { JWTService } from "../../middlewares/JWTService";
import { PasswordCrypto } from "../../middlewares/PasswordCrypto";

import { validation } from "../../middlewares/Validation";

interface IBodyProps extends Omit<IUser, "uuid" | "signupDate" | "lastLogin"> { }

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(2),
        password: yup.string().required().min(5),
        email: yup.string().email().required().min(2)
    }))
}));

export const signUp = async (req: Request<{}, {}, IUser>, res: Response) => {
    req.body.password = await PasswordCrypto.hashPassword(req.body.password);

    const result = await UsersProvider.insert(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};