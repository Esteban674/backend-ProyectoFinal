import { ManagerMongoDB } from "../ManagerMongoDB.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "User"
    },
    password: {
        type: String,
        // required: true
    },
    id_cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
    documents: [
        {
            name: { //nombre del documento
                type: String, 
                required: true
            },
            reference: { // link al documento
                type: String,
                required: true
            }
        }
    ],
    last_connection: {
        type: Date
    }
})

export class ManagerUserMongoDB extends ManagerMongoDB {
    constructor() {
        super(process.env.MONGODBURL, "users", userSchema)

    }

    async getElementByEmail(email) {
        super.setConnection()
        try {
            return await this.model.findOne({ email: email })
        } catch (error) {
            return error
        }
    }

    async getElementByIdCart(id_cart) {
        super.setConnection()
        try {
            return await this.model.findOne({ id_cart: id_cart })
        } catch (error) {
            return error
        }
    }

    async updateUserPassword(id, newPassword) {
        super.setConnection();
        try {
            return await this.model.findByIdAndUpdate(id, { password: newPassword }, { new: true });
        } catch (error) {
            return error;
        }
    }

    async updateUserRole(id, newRole) {
        super.setConnection();
        try {
            return await this.model.findByIdAndUpdate(id, { rol: newRole });
        } catch (error) {
            return error;
        }
    }

}