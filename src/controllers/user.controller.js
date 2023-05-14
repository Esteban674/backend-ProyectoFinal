import { getUserById, createUser, getUserByEmail } from "../services/user.services.js";

export const createUserController = async (req, res) => {
    try {
        // await createUser(req.body); ya creado con Passport
        res.status(201).send({ status: "success", message: "User created" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json({ message: user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getUserByEmailController = async (req, res) => {
    try {
        const user = await getUserByEmail(req.params.email);
        res.status(200).json({ message: user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
