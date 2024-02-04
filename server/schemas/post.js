const { ObjectId } = require("mongodb");
const Post = require("../models/post");
const redis = require("../config/redis");

const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    result: User
  }

  type AllPost {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    authorIdResult: User
  }

  type Comments {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Likes {
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllPost: [AllPost]
    getPostById(id:ID!): Post
  }

  type Mutation {
    createPost(content: String!, tags: [String], imgUrl: String): Post
    addComment(_id: ID, content: String!): Comments
    addLike(_id: ID): Likes
  }
`;

const resolvers = {
  Query: {
    getAllPost: async (_, __, { authentication }) => {
      const auth = await authentication();
      const cache = await redis.get("getAllPost");
      if (!auth) {
        throw new GraphQLError("Invalid User");
      }
      if (cache) {
        console.log("Hit To Redis");
        return JSON.parse(cache);
      }
      console.log("Hit To MongoDb");
      const users = await Post.getAllPost();
      await redis.set("getAllPost", JSON.stringify(users), "EX", 5);
      return users;
    },
    getPostById: async (_, {id}) => {
      const post = await Post.getPostById(id);
      // console.log(id)
      // console.log(post,"<<<post")
      return post;
    },
  },
  Mutation: {
    createPost: async (_, { content, tags, imgUrl }, { authentication }) => {
      const { id } = await authentication();
      if (!content) {
        throw new Error("Content is required");
      }
      const newPost = {
        content,
        tags,
        imgUrl,
        comments: [],
        likes: [],
        authorId: new ObjectId(id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Post.createPost(newPost);
      await redis.del("getAllPost");
      return newPost;
    },

    addComment: async (_, { _id, content }, { authentication }) => {
      const { username } = await authentication();
      const newComment = {
        content,
        username: username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Post.addComment(_id, newComment);
      return newComment;
    },

    addLike: async (_, { _id }, { authentication }) => {
      const { username } = await authentication();
      const newLike = {
        username: username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Post.addLike(_id, newLike);
      return newLike;
    },
  },
};
module.exports = { typeDefs, resolvers };
