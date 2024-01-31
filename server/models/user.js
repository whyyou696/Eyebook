const { database } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
class User {
  static async getAllUser() {
    const users = database.collection("users");
    const user = await users.find().toArray();
    return user;
  }
  static async addUser(user) {
    const users = database.collection("users");
    const newUser = await users.insertOne(user);
    return newUser;
  }

  static async getByUsername({ username }) {
    const users = database.collection("users");
    const user = await users.findOne({ username });
    return user;
  }

  static async getByEmail({ email }) {
    const users = database.collection("users");
    const user = await users.findOne({ email });
    return user;
  }

  static async getById({_id}) {
    const users = database
      .collection("users")
      .findOne({ _id: new ObjectId(_id) });
    return users;
  }
  static async searchUser(searchQuery) {
    const users = database.collection("users");
    const user = await users
      .find({
        username: { $regex: new RegExp(searchQuery, "i") },
      })
      .toArray();
    return user;
  }
}
module.exports = User;
