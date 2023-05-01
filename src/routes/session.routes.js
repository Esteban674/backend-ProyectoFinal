import { Router } from "express";
import passport from "passport";
import { destroySession, testLogin } from "../controllers/session.controller.js";
import { passportCall, authorization } from "../utils/messageErrors.js";

const routerSession = Router()

routerSession.post("/login", passport.authenticate('login'), testLogin)
routerSession.get("/logout", destroySession)

routerSession.get("/current", passportCall('jwt'), authorization('Admin'), (req, res) => {
  res.send(req.user)
})

export default routerSession