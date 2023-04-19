import { Knex } from "../..";
import { IUser } from "../../../../models";
import { ETableNames } from "../../../ETableNames";

export const update = async (uuid: string, user: Omit<IUser, "uuid">): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.users)
            .update(user)
            .where("uuid", "=", uuid);

        if (result > 0) return;

        return new Error("Record not found");
    } catch (error) {
        console.log(error);
        return new Error("Error while registering the record");
    }
};