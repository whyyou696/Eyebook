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
  `;

const resolvers = {
  Query: {
    users: () => users,
  },
};

module.exports = {
  typeDefs,
  resolvers,
}