import { Router } from 'express';
import { userModel } from '../models/user.js';

const routerUser = Router();

routerUser.get('/', async (req, res) => {
  try {
    const users = await userModel.find()
    res.send({resultado: 'success', valores: users})
  } catch (error) {
    res.send("Error en consulta a users, mensaje: ", error.message)
  }
})

export default routerUser;