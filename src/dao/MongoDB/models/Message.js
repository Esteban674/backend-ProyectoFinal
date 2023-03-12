import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const messageSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    message: {
        type: String,
        required: true,
    }
})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(process.env.MONGODBURL, "messages", messageSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}