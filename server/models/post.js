const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");

class Post {
  static async getAllPost() {
    const agg = [
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "authorIdResult",
        },
      },
      {
        $unwind: {
          path: "$authorIdResult",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const posts = database.collection("posts");
    const result = await posts.aggregate(agg).toArray();
    return result;
  }
  static async getPostById(_id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const posts = database.collection("posts");
    const result = await posts.aggregate(agg).toArray();
    return result[0];
  }
  static async createPost(newPost) {
    const posts = database.collection("posts");
    const result = await posts.insertOne(newPost);
    return result;
  }

  static async addComment(id, newComment) {
    const posts = database.collection("posts");
    const result = await posts.updateOne(
      { _id: new ObjectId(id) },
      {
        $addToSet: { comments: newComment },
      }
    );
    return result;
  }
  static async addLike(id, newLike) {
    const posts = database.collection("posts");
    const result = await posts.updateOne(
      { _id: new ObjectId(id) },
      {
        $addToSet: { likes: newLike },
      }
    );
    return result;
  }
}

module.exports = Post;
