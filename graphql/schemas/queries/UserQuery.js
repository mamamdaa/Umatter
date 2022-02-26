const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = graphql;
const { protect } = require("../../../middlewares/AuthMiddleware");
const User = require("../../../models/UserModel");
const { UserType } = require("../types/TypeDefs");
const generateToken = require("../../../utils/GenerateToken");

const getUsers = {
  name: "getUsers",
  type: new GraphQLList(UserType),
  args: {
    is_in_queue: {
      type: GraphQLBoolean,
    },
  },
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return User.find(params).select("-password");
  },
};

const getUser = {
  name: "getUser",
  type: UserType,
  args: {
    clientId: {
      type: GraphQLString,
    },
  },
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    let user = await User.findById(params.clientId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
};

const getUsersInQueue = {
  name: "getUsersInQueue",
  type: new GraphQLList(UserType),
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }

    
    return User.find({ is_in_queue: true }).select("-password");
  },
};


module.exports = { getUsers, getUser,getUsersInQueue};
