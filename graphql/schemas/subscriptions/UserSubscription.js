const graphql = require('graphql');
const {UserType} = require('../types/TypeDefs');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql
const NEW_LOGIN = 'NEW_LOGIN';

const newLogin = {
    name: 'newLogin',
    type: UserType,
    subscribe: (_,__,{pubsub}) => 
    {   
       return pubsub.asyncIterator(NEW_LOGIN);
    },
}

module.exports = {newLogin}
