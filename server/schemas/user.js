const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
  type User {
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Token {
    access_token: String
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
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.getAllUser();
      return users;
    },
  },
  Mutation: {
    addUser: async (_, { UserInput }) => {
      const { name, username, email, password } = UserInput;
      const newUser = {
        name,
        username,
        email,
        password: hashPassword(password),
      };

      // check email exist
      const emailExist = await User.getByEmail({ email });
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
      return newUser;
    },
    login: async (_, { username, password }) => {
      if (!username || username == "") {
        throw new GraphQLError("Username is required");
      }
      if (!password || password == "") {
        throw new GraphQLError("Password is required");
      }
      const user = await User.getByUsername({ username });

      if (!user) {
        throw new GraphQLError("User not found");
      }

      const checkPassword = comparePassword(password, user.password);

      if (!checkPassword) {
        throw new GraphQLError("Wrong password", {
          extensions: {
            code: "WRONG_PASSWORD",
          },
        });
      }
      const access_token = signToken({
        id: user._id,
      });

      return { access_token }; // return token object
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
