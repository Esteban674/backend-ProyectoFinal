import mongoose from "mongoose";
import userModel from "../src/dao/models/User.js";
import Assert from 'assert'

const assert = Assert.strict;
await mongoose.connect(process.env.MONGODBURL)

const data = await getManagerUsers();
const managerUser = new ManagerUserMongoDB();
console.log(managerUser);

describe("Testing User", () => {

  before(async () => {

  });

  beforeEach(function () {
    this.timeout(10000);
  });

  it("Consultar todos los usuarios de mi BBD", async function () {
    try {
      const resultado = await managerUser.getElements();
      assert.strictEqual(Array.isArray(resultado), true);
    } catch (error) {
      throw error;
    }
  });
});
