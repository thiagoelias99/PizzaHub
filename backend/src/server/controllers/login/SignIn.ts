import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../../database/knex/providers";
import { IUser } from "../../../models";
import { JWTService } from "../../middlewares/JWTService";
import { PasswordCrypto } from "../../middlewares/PasswordCrypto";

import { validation } from "../../middlewares/Validation";

interface IBodyProps {
    email: string
    password: string
}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        password: yup.string().required().min(5),
        email: yup.string().email().required().min(2)
    }))
}));


export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const { email, password } = req.body;

    const user = await UsersProvider.selectByEmail(email);

    if (user instanceof Error) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const matchPassword = await PasswordCrypto.verifyPassword(password, user.password);

    if (!matchPassword) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const accessToken = JWTService.sign({ uid: user.uuid });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    await UsersProvider.updateUserLogin(user.uuid);

    return res.status(StatusCodes.OK).json({ accessToken, userName: user.name });
};