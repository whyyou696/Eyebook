const User = require("../models/user");

const typeDefs = `#graphql
  type User {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String, username: String!, email: String!, password: String!): User
  }
  `;


const resolvers = {
  Query: {
    users: async () => {

      const users = await User.getAllUser();
      return users
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const { name, username, email, password } = args;
      console.log(args, "<< args");
      const user = { name, username, email, password };
      await User.addUser(user);
      // console.log(newUser)
      return user
    }
  }
};

module.exports = {
  typeDefs,
  resolvers,
}