if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require("@apollo/server/standalone")
const { connect } = require("./config/mongodb");
const authentication= require("./middlewares/authentication");
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schemas/user");
const { typeDefs: postTypeDefs, resolvers: postResolvers } = require("./schemas/post");
const { typeDefs: followTypeDefs, resolvers: followResolvers } = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
});

connect().then(() => {
  return startStandaloneServer(server, {
      listen: { port: 3000 || process.env.PORT },
      context: ({ req }) => {
          return {
              authentication: () => authentication(req),
          }
      }
  })
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});