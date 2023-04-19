import { Knex } from "../..";
import { ETableNames } from "../../../ETableNames";

export const updateValue = async (uuid: string, value: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.ingredients)
            .update({
                valuePerUnit: value,
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