const User = require("../models/user");
const { hashPassword,comparePassword } = require("../helpers/bcrypt");
const { GraphQLError } = require("graphql");

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

  input UserInput {
    name: String,
    username: String!,
    email: String!,
    password: String!,
  }
  type Mutation {
    addUser(UserInput: UserInput): User
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
    addUser: async (_, { UserInput}) => {
      const { name, username, email, password } = UserInput;
      const newUser = {
        name,
        username,
        email,
        password: hashPassword(password),
      }

      // check email exist
      const emailExist = await User.getByEmail({email});
      if (emailExist) {
        throw new GraphQLError("Email already exist");
      }

      // check username exist
      const usernameExist = await User.getByUsername({ username });
      if (usernameExist) {
        throw new GraphQLError("Username already exist");
      }

      // check password
      if (password.length < 5) {
        throw new GraphQLError("Password must be at least 5 characters");
      }

      // check email format
      if (email && !email.includes("@")) {
        throw new GraphQLError("Invalid email format");
      }

      await User.addUser(newUser);
      return newUser
    }
  },
};

module.exports = {
  typeDefs,
  resolvers,
}