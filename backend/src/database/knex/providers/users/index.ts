import * as insert from "./Insert";
import * as select from "./Select";
import * as update from "./Update";
import * as del from "./Delete";

export const UsersProvider = {
    ...insert,
    ...select,
    ...update,
    ...del,
};