const Follow = require("../models/follow");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql

    type Follow {
        _id: ID
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
    }
    
    type UnfollowResponse {
        message: String
    }
    
    type Query {
        getFollow(followingId: ID!, followerId: ID!): Follow
    }

    type Mutation {
    follow(userId: ID): Follow
    unfollow(userId: ID): UnfollowResponse
  }
  
  `;

const resolvers = {
  Query: {
    getFollow: async (_, args, { authentication }) => {
      const auth = await authentication();
      const { userId } = args;
      const follows = await Follow.getFollow(userId, auth.id);
      return follows;
    },
  },
  Mutation: {
    follow: async (_, args, { authentication }) => {
      const auth = await authentication();
      const { userId } = args;
      const follows = await Follow.getFollow(userId, auth.id);
      if (follows) {
        throw new GraphQLError("Already following", {
          extensions: { code: "BAD_REQUEST" },
        });
      }
      const follow = await Follow.followUser(userId, auth.id);
      // console.log("Follow Mutation Result:", auth.id);
      return follow;
    },
    unfollow: async (_, args, { authentication }) => {
      const auth = await authentication();
      const { userId } = args;
      const follows = await Follow.getFollow(userId, auth.id);
      if (!follows) {
        throw new GraphQLError("Not following", {
          extensions: { code: "BAD_REQUEST" },
        });
      }
      const unfollowResult = await Follow.unfollowUser(userId, auth.id);
      // console.log("Unfollow Mutation Result:", auth.id);
      return unfollowResult;
    },
  },
};

module.exports = { typeDefs, resolvers };
