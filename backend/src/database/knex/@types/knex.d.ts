import { IUser } from "../../../models";
import { ETableNames } from "../../ETableNames";

declare module "knex/types/tables" {
    interface Tables {
        [ETableNames.users]: IUser
    }
}