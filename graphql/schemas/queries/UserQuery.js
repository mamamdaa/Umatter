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
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  // resolve: async (parent, args) => {
  //   const user = new User(args)
  //   await user.save()
  //   return "User added"
  // }
  resolve(parentValue, args) {
    return User.find({})
  }
}

const authUser = {
  name: 'authUser',
  type: UserType,
  args: {
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  async resolve(parentValue, args) {
      const user = await User.findOne({email: args.email})
      if(!user || !(await user.isMatchPassword(args.password))) {
        throw new Error('User not found')
      }
      else{
        let convertedUser = user.toJSON()
        delete convertedUser.password
        return convertedUser
      }
    }
}

module.exports = {getUsers,authUser}