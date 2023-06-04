import { getUserById, createUser, getUserByEmail, updateUserPassword } from "../services/user.services.js";

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

export const resetPasswordController = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { password } = req.body;

        const user = await getUserById(userId);

        if (user.password === password) {
            return res.status(400).send({ message: "La nueva contraseña no puede ser igual a la anterior." });
        }

        // Actualizar la contraseña en la base de datos utilizando updateUserPassword
        await updateUserPassword(userId, password);

        res.status(200).send({ message: "Contraseña actualizada exitosamente." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
