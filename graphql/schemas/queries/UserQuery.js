const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql
const {protect} = require('../../../middlewares/AuthMiddleware');
const User = require('../../../models/UserModel');
const {UserType} = require('../types/TypeDefs');
const generateToken = require('../../../utils/GenerateToken');

const getUsers = {
  name: 'getUsers',
  type: new GraphQLList(UserType),
  resolve: async function (root, params,{req, res}) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return User.find({}).select("-password")
  }
}

module.exports = {getUsers}