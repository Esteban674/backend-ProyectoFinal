import { Router } from "express";
import { createUserController, getUserByIdController } from "../controllers/user.controller.js";
import passport from "passport";

const routerUser = Router()

routerUser.post("/register", passport.authenticate('register'), createUserController)
routerUser.get("/:id", getUserByIdController)

export default routerUser

