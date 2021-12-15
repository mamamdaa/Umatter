const graphql = require('graphql');
const userData = require('../../../userData.json');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql
const {protect} = require('../../../middlewares/AuthMiddleware');
const User = require('../../../models/UserModel');
const UserType = require('../types/UserType');
const generateToken = require('../../../utils/generateToken');

const getUsers = {
  name: 'addUser',
  type: new GraphQLList(UserType),
  args: {
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  resolve: async function (root, params,{req, res}) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return User.find({}).select("-password")
  }
}


module.exports = {getUsers}