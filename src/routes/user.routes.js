import { Router } from "express";
import { createUserController, getUserByIdController, resetPasswordController, changeRoleController, uploadDocumentsController, getAllUsersController, deleteInactiveUsersController } from "../controllers/user.controller.js";
import passport from "passport";
import { uploader } from "../utils/uploader.js";

const routerUser = Router()

routerUser.get("/", getAllUsersController);
routerUser.delete("/", deleteInactiveUsersController);
routerUser.post("/register", passport.authenticate('register'), createUserController);
routerUser.get("/:id", getUserByIdController);
routerUser.post("/resetpassword", resetPasswordController);
routerUser.post("/:uid/documents", uploader.any(), uploadDocumentsController);
routerUser.put("/premium/:id", changeRoleController);

export default routerUser

