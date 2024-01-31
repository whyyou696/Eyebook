const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb")

class Post {
    static async getAllPost() {
        const posts = database.collection("posts")
        const result = await posts.find({}).toArray()
        return result
    }
    static async createPost(newPost) {
        const posts = database.collection("posts")
        const result = await posts.insertOne(newPost)
        return result
    }
}

module.exports = Post;