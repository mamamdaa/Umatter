const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLObject,
  GraphQLList
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

const MessageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: () => ({
      _id: { type: GraphQLString },
      text: { type: GraphQLString },
      sender: { type: GraphQLString },
      channel: { type: GraphQLString },
    })
});

const ChannelType = new GraphQLObjectType({
    name: 'ChannelType',
    fields: () => ({
        _id: { type: GraphQLString },
        channel_name: { type: GraphQLString },
        messages: { type: new GraphQLList(MessageType) },
        users: { type: new GraphQLList(UserType) },
    })
});

module.exports = {UserType, MessageType, ChannelType};