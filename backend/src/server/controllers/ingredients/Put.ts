import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IngredientsProvider } from "../../../database/knex/providers";
import { validation } from "../../middlewares/Validation";

interface IParamProps {
    uuid?: string;
}

interface IBodyProps {
    valuePerUnit: number
 }

export const updateValueValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        uuid: yup.string().required(),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        valuePerUnit: yup.number().required().min(2)
    }))
}));

export const updateValue = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.uuid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro \"uuid\" precisa ser informado."
            }
        });
    }

    const result = await IngredientsProvider.updateValue(req.params.uuid, req.body.valuePerUnit);

    if (result instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};