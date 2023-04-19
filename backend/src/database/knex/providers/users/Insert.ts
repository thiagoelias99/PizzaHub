import { v4 as uuidv4 } from "uuid";

import { Knex } from "../..";
import { IUser } from "../../../../models";
import { ETableNames } from "../../../ETableNames";

export const insert = async (user: IUser): Promise<string | Error> => {
    try {
        let uuid;
        const now = new Date().toISOString();

        do {
            uuid = uuidv4();
        }
        while (await Knex(ETableNames.users).select("uuid").first().where("uuid", uuid));

        user.uuid = uuid;
        user.signupDate = now;
        user.lastLogin = now;
        const [result] = await Knex(ETableNames.users).insert(user).returning("uuid");

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