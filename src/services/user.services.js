import { getManagerUsers } from "../dao/daoManager.js";

const data = await getManagerUsers();
export const managerUser = new data.ManagerUserMongoDB();

export const createUser = async (user) => {
  await managerUser.addElement(user);
};

export const getUserById = async (id) => {
  const user = await managerUser.getElementById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await managerUser.getElementByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getUserByIdCart = async (id) => {
  const user = await managerUser.getUserByIdCart(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
