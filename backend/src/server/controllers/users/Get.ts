import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../../database/knex/providers";
import { validation } from "../../middlewares/Validation";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
    uuid?: string;
}

interface IParamProps {
    uuid?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().default(1).moreThan(0),
        limit: yup.number().default(7).moreThan(0),
        filter: yup.string().default("").optional(),
        uuid: yup.string().default("").optional(),
    }))
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    const result = await UsersProvider.selectAll(req.query.page || 1, req.query.limit || 7, req.query.filter || "", req.query.uuid || "");    
    if (result instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: result.message
            }
        });
    }

    const count = await UsersProvider.totalCount(req.query.filter);    
    if (count instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: count.message
            }
        });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);

    return res.status(StatusCodes.OK).json(result);
};

export const getByUuidValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        uuid: yup.string().required(),
    }))
}));

export const getByUuid = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.uuid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O parâmetro \"uuid\" precisa ser informado."
            }
        });
    }

    const result = await UsersProvider.selectByUuid(req.params.uuid);

    if (result instanceof Error) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.OK).json(result);
};