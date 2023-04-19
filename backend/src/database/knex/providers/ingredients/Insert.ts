import { v4 as uuidv4 } from "uuid";

import { Knex } from "../..";
import { IIngredient } from "../../../../models";
import { ETableNames } from "../../../ETableNames";

export const insert = async (ingredient: IIngredient): Promise<string | Error> => {
    try {
        let uuid;
        const now = new Date().toISOString();

        do {
            uuid = uuidv4();
        }
        while (await Knex(ETableNames.ingredients).select("uuid").first().where("uuid", uuid));

        ingredient.uuid = uuid;
        ingredient.createdAt = now;
        ingredient.updatedAt = now;
        ingredient.deleted = false;
        
        const [result] = await Knex(ETableNames.ingredients).insert(ingredient).returning("uuid");

        if (typeof result === "object") {
            return result.uuid;
        } else if (typeof result === "string") {
            return result;
        }

        return new Error("Error while registering the record");
    } catch (error) {
        console.log(error);
        return new Error("Error while registering the record");
    }
};