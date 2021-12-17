const graphql = require('graphql');
const {MessageType} = require('../types/TypeDefs');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql

const newMessage = {
    name: 'newMessage',
    type: MessageType,
    args: {
        channel: {
            type: GraphQLString
        }
    },
    subscribe: (_,__,{pubsub}) => 
    {   
       return pubsub.asyncIterator('NEW_MESSAGE');
    },
}


module.exports = {newMessage}
