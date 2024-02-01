const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");


class Post {
  static async getAllPost() {
    const posts = database.collection("posts");
    const result = await posts.find({}).toArray();
    return result;
  }
  static async getPostById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(id),
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
    // console.log(result, "<<<result");
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
