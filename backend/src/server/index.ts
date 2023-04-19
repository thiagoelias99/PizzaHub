import express from "express";
import { routes } from "./routes";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors({
    origin: process.env.ENABLED_CORS?.split(";") || []
}));
server.use(routes);

export { server };