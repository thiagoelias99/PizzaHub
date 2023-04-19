import { Router } from "express";

import { UsersController } from "../controllers";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const routes = Router();

routes.route("/users")
    // .all(ensureAuthenticated)
    .post(UsersController.postValidation, UsersController.post)
    .get(UsersController.getAllValidation, UsersController.getAll);

routes.route("/users/:uuid")
    // .all(ensureAuthenticated)
    .get(UsersController.getByUuidValidation, UsersController.getByUuid)
    .put(UsersController.putValidation, UsersController.put)
    .delete(UsersController.deleteValidation, UsersController.del);

export { routes };