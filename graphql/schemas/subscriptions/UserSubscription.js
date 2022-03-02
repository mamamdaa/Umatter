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
//fix access/ only facilitator can access
const queueUpdate = {
    name: 'queueUpdate',
    type: UserType,
    // args : {
    //     id : {type : GraphQLString}
    // },
    subscribe: (_,params,{pubsub}) =>
    {
        return pubsub.asyncIterator(['QUEUE_UPDATE']);
    }
}


module.exports = {newLogin,queueUpdate}
