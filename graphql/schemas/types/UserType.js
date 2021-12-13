const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLObject,

} = graphql

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
      _id: {type: GraphQLString},
      first_name: {type: GraphQLString},
      last_name: {type: GraphQLString},
      email: {type: GraphQLString},
      password: {type: GraphQLString},
      token: {type: GraphQLString},
    
    })
});


module.exports = UserType;