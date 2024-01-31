const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Follow {
  static async followUser(userId, follower) {
    const follows = database.collection("follows");
    const result = await follows.insertOne({
      followingId: new ObjectId(userId),
      followerId: follower,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await follows.findOne({ _id: result.insertedId });
  }

  // get follow
  static async getFollow(followingId, followerId) {
    return await database.collection("follows").findOne({
      followingId: new ObjectId(followingId),
      followerId,
    });
  }

  static async unfollowUser(userId, followerId) {
    const follows = database.collection("follows");
    await follows.deleteOne({
      followingId: new ObjectId(userId),
      followerId: followerId,
    });
    return { message: "Unfollowed" };
  }
}

module.exports = Follow;
