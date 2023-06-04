import { Router } from "express";
import { createUserController, getUserByIdController, resetPasswordController } from "../controllers/user.controller.js";
import passport from "passport";

const routerUser = Router()

routerUser.post("/register", passport.authenticate('register'), createUserController)
routerUser.get("/:id", getUserByIdController)
routerUser.post("/resetpassword", resetPasswordController);

export default routerUser

