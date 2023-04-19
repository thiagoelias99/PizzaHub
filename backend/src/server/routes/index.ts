import { Router } from "express";

import { UsersController, LoginController } from "../controllers";
import { signUp } from "../controllers/login/SignUp";
import { signIn } from "../controllers/login/SignIn";

const routes = Router();

routes.post("/signup", LoginController.signUpValidation, signUp);
routes.post("/signin", LoginController.signInValidation, signIn);

routes.route("/users")
    //.all(ensureAuthenticated)
    .post(UsersController.postValidation, UsersController.post)
    .get(UsersController.getAllValidation, UsersController.getAll);

routes.route("/users/:uuid")
    // .all(ensureAuthenticated)
    .get(UsersController.getByUuidValidation, UsersController.getByUuid)
    .put(UsersController.putValidation, UsersController.put)
    .delete(UsersController.deleteValidation, UsersController.del);

export { routes };