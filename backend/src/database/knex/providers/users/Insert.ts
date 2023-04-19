import { Knex } from "../..";
import { IUser } from "../../../../models";
import { ETableNames } from "../../../ETableNames";

export const insert = async (user: Omit<IUser, "uuid">): Promise<string | Error> => {
    try {
        console.log(user);
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