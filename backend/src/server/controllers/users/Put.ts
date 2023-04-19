import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../../database/knex/providers";
import { IUser } from "../../../models";
import { validation } from "../../middlewares/Validation";

interface IParamProps {
    uuid?: string;
}

interface IBodyProps extends Omit<IUser, "uuid" | "signupDate" | "lastLogin"> { }

export const putValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        uuid: yup.string().required(),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(2),
        password: yup.string().required().min(5),
        email: yup.string().email().required().min(2)
    }))
}));

export const put = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.uuid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro \"uuid\" precisa ser informado."
            }
        });
    }

    const result = await UsersProvider.update(req.params.uuid, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};