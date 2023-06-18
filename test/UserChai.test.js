import config from '../src/config/config.js';
import chai from 'chai';
import mongoose from "mongoose";
import { ManagerUserMongoDB } from "../src/dao/MongoDB/models/User.js";

await mongoose.connect(process.env.MONGODBURL).then(() => console.log("DB is connected"))

const expect = chai.expect;

describe("Testing User", () => {
  before(async function () {
    this.managerUser = new ManagerUserMongoDB();
  },
    beforeEach(function () {
      this.timeout(6000);
    },
      it("Consultar todos los usuarios de mi BBD con Chai", async function () {
        try {
          const resultado = await this.managerUser.getElements();
          expect(resultado).to.be.an('array');
          //expect(Array.isArray(resultado)).to.be.ok;       es otra forma de hacerlo
          console.log(resultado);
        } catch (error) {
          throw error;
        }
      }),
      it("Crear un nuevo usuario con Chai", async function () {
        const newUser = {
          first_name: "Julieta",
          last_name: "Ximenez",
          email: "juli@juli.com",
          age: 20,
          rol: "User",
          password: "1234",
        }
        try {
          const resultado = await this.managerUser.addElement(newUser)
          expect(resultado).to.be.an('object')
        } catch (error) {
          throw error;
        }
      }),
    ));
});