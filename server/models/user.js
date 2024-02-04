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

  static async getById({ auth, _id }) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(auth.id),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "userFollowing",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "userFollowers",
        },
      },
    ];
    const users = database.collection("users");
    const user = await users.aggregate(agg).toArray();
    return user[0];
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
