const UserQuery = require('./queries/UserQuery');
const UserMutation = require('./mutations/UserMutation');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} = graphql
const UserType = require('./types/UserType');

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: UserQuery
    
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: UserMutation
});


const schema = new graphql.GraphQLSchema({query:Query,mutation:Mutation});

module.exports = schema;