import { Router } from "express";
import { createUserController, getUserByIdController, resetPasswordController, changeRoleController } from "../controllers/user.controller.js";
import passport from "passport";

const routerUser = Router()

routerUser.post("/register", passport.authenticate('register'), createUserController)
routerUser.get("/:id", getUserByIdController)
routerUser.post("/resetpassword", resetPasswordController);
routerUser.put("/premium/:id", changeRoleController)

export default routerUser

