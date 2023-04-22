import { Knex } from "../..";
import { IIngredient } from "../../../../models";
import { ETableNames } from "../../../ETableNames";

export const selectAll = async (page: number, limit: number, filter: string, uuid: string): Promise<IIngredient[] | Error> => {
    try {
        const result = await Knex(ETableNames.ingredients)
            .select("*")
            .where("uuid", uuid)
            .orWhere("description", "like", `%${filter}%`)
            .andWhere("deleted", 0)
            .offset((page - 1) * limit)
            .limit(limit);

        //If query uuid isn't in result data, add it
        if (uuid && result.every(item => item.uuid !== uuid)) {
            const resultById = await Knex(ETableNames.ingredients)
                .select("*")
                .where("uuid", "=", uuid)
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.log(error);
        return new Error("Error while registering the record");
    }
};

export const selectByUuid = async (uuid: string): Promise<IIngredient | Error> => {
    try {
        const result = await Knex(ETableNames.ingredients)
            .select("*")
            .where("uuid", "=", uuid)
            .first();

        if (result) return result;

        return new Error("Record not found");
    } catch (error) {
        console.log(error);
        return new Error("Error while registering the record");
    }
};

export const totalCount = async (filter = ""): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.ingredients)
            .where("description", "like", `%${filter}%`)
            .count<[{ count: number }]>("* as count");

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error("Error querying the total number of records");
    } catch (error) {
        console.log(error);
        return new Error("Error querying the total number of records");
    }
};