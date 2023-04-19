import { knex } from "knex";
import "dotenv/config";
//import pg from "pg";

import { development, production, test } from "./Environment";

/* if (process.env.NODE_ENV === "production") {
    pg.types.setTypeParser(20, "text", parseInt);
} */

const getEnvironment = () => {
    console.log("Environment = " + process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
    case "production": return production;
    case "test": return test;

    default: return development;
    }
};

export const Knex = knex(getEnvironment());