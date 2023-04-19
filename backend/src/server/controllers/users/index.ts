import * as post from "./Post";
import * as get from "./Get";
import * as put from "./Put";
import * as del from "./Delete";

export const UsersController = {
    ...post,
    ...get,
    ...put,
    ...del
};