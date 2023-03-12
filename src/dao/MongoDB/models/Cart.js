import { ManagerMongoDB } from "../ManagerMongoDB.js";
import { Schema } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            id: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(process.env.MONGODBURL, "carts", cartSchema)
        //Aqui irian los atributos propios de la clase
    }
    //Aqui irian los metodos propios de la clase
}