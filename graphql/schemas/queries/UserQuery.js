const graphql = require('graphql');
const userData = require('../../../userData.json');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql
const User = require('../../../models/UserModel');
const UserType = require('../types/UserType');

const getUsers = {
  name: 'addUser',
  type: new GraphQLList(UserType),
  args: {
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  // resolve: async (parent, args) => {
  //   const user = new User(args)
  //   await user.save()
  //   return "User added"
  // }
  resolve(parentValue, args) {
    return userData
  }
}

module.exports = {getUsers}