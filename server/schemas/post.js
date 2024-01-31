const Post = require("../models/post");

const typeDefs = `#graphql
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllPost: [Post]
  }

  type Mutation {
    createPost(content: String!, tags: [String], imgUrl: String): Post
  }
  
`;

const resolvers = {
  Query: {
    getAllPost: async () => {
      const users = await Post.getAllPost();
      return users;
    },
  },
  Mutation: {
    createPost: async (_, { content, tags, imgUrl }) => {
      if (!content) {
        throw new Error("Content is required");
      }
      const newPost = {
        content,
        tags,
        imgUrl,
        authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await Post.createPost(newPost);
      return newPost;
    },
  },
};
module.exports = { typeDefs, resolvers };
