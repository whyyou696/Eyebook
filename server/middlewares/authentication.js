const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

async function authentication(req) {
    const token = req.headers.authorization;
    if (!token)
      throw new GraphQLError("Invalid User", {
        extensions: {
          code: "INVALID_USER",
        },
      });
    
    const [bearer, access_token] = token.split(" ");
    
    if(bearer !== "Bearer")
      throw new GraphQLError("Invalid Token", {
        extensions: {
          code: "INVALID_TOKEN",
        },
      });
    
    const payload = verifyToken(access_token);
    const user = await User.getById({ _id: payload.id });
    if (!user)
      throw new GraphQLError("Invalid Token", {
        extensions: {
          code: "INVALID_TOKEN",
        },
      });
    return { id: user._id, email: user.email, username: user.username };
};

module.exports = authentication;
