const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

async function authentication(req) {
  console.log(authentication, "<<<authentication");
  const token = req.headers.authorization;
  if (!token)
    throw new GraphQLError("Invalid User", {
      extensions: {
        code: "INVALID_USER",
      },
    });
  const [bearer, access_token] = token.split(" ");

  if (bearer !== "Bearer")
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "INVALID_TOKEN",
      },
    });

  const payload = verifyToken(access_token);
  console.log(payload, "<<<payload");
  return { id: payload.id, email: payload.email, username: payload.username };
}

module.exports = authentication;
