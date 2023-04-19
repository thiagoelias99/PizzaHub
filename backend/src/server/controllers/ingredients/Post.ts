import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IngredientsProvider } from "../../../database/knex/providers";
import { IIngredient } from "../../../models";
import { validation } from "../../middlewares/Validation";

interface IBodyProps extends Omit<IIngredient, "uuid" | "createdAt" | "updatedAt" | "deleted"> { }

export const postValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        description: yup.string().required().min(1),
        unit: yup.string().required().min(1),
        valuePerUnit: yup.number().required().min(2)
    }))
}));

export const post = async (req: Request<{}, {}, IIngredient>, res: Response) => {
    const result = await IngredientsProvider.insert(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};