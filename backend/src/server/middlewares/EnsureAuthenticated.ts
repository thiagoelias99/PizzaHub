import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "./JWTService";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const jwtData = JWTService.verify(token);
    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: "Error verifying the token" }
        });
    } else if (jwtData === "INVALID_TOKEN") {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    req.headers.userId = jwtData.uid.toString();

    return next();
};