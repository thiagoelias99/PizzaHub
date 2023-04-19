import { Knex } from "../..";
import { ETableNames } from "../../../ETableNames";

export const del = async (uuid: string): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.ingredients)
            .update({
                deleted: true,
                updatedAt: new Date().toISOString()
            })
            .where("uuid", "=", uuid);
        if (result > 0) return;

        return new Error("Record not found");
    } catch (error) {
        console.log(error);
        return new Error("Error while registering the record");
    }
};