const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
    profileimg: String!
  }


  type UserFollowingFollowers {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
    profileimg: String!
    followings: [Follow]
    userFollowing: [User]
    followers: [Follow]
    userFollowers: [User]
  }

  type Token {
    access_token: String
  }

  type Query {
    getAllUser: [User]
    getById(_id: ID!): UserFollowingFollowers
    searchUser(searchQuery: String!): [User]
  }

  input UserInput {
    name: String,
    username: String!,
    email: String!,
    password: String!,
    profileimg: String!
  }
  
  type Mutation {
    addUser(UserInput: UserInput): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    getAllUser: async (_,__,{ authentication }) => {
      const auth = await authentication();
      if (!auth) {
        throw new GraphQLError("Invalid User");
      }
      const users = await User.getAllUser();
      return users;
    },
    getById: async (_,{_id}, { authentication}) => {
      try {
      const auth = await authentication();
      const getUserbyId = await User.getById({auth, _id})
      return getUserbyId;  
      } catch (error) {
        console.log(error)
      }
      
  },
    searchUser: async (_, { searchQuery }, {authentication}) => {
      const auth = await authentication()
      const match = await User.searchUser(searchQuery);
      console.log(searchQuery, "<<< searchQuery");
      console.log(match, "<<< match");
      return match;
    }
  },

  Mutation: {
    addUser: async (_, { UserInput }) => {
      const { name, username, email, password, profileimg } = UserInput;
      const newUser = {
        name,
        username,
        email,
        password: hashPassword(password),
        profileimg
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
      if (!username || username == " ") {
        throw new GraphQLError("Username is required");
      }
      if (!password || password == " ") {
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
        email: user.email,
        username: user.username,
      });
      return { access_token };
    },
  },
};
module.exports = {
  typeDefs,
  resolvers,
};
