import { Router } from "express";

import {
    UsersController,
    LoginController,
    IngredientsController
} from "../controllers";

import { signUp } from "../controllers/login/SignUp";
import { signIn } from "../controllers/login/SignIn";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const routes = Router();

routes.post("/signup", LoginController.signUpValidation, signUp);
routes.post("/signin", LoginController.signInValidation, signIn);

routes.route("/users")
    .all(ensureAuthenticated)
    .get(UsersController.getAllValidation, UsersController.getAll);

routes.route("/users/:uuid")
    .all(ensureAuthenticated)
    .get(UsersController.getByUuidValidation, UsersController.getByUuid);

routes.route("/ingredients")
    .all(ensureAuthenticated)
    .post(IngredientsController.postValidation, IngredientsController.post)
    .get(IngredientsController.getAllValidation, IngredientsController.getAll);

routes.route("/ingredients/:uuid")
    .all(ensureAuthenticated)
    .get(IngredientsController.getByUuidValidation, IngredientsController.getByUuid)
    .put(IngredientsController.updateValueValidation, IngredientsController.updateValue)
    .delete(IngredientsController.deleteValidation, IngredientsController.del);

export { routes };