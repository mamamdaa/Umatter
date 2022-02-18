const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLObject,
  GraphQLList,
  GraphQLBoolean
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
      channels: {type: new GraphQLList(ChannelType)},
      is_in_queue: {type: GraphQLBoolean},
      assigned_to: {type: FacilitatorType},
      is_assigned: {type: GraphQLBoolean},
      channel : {type: GraphQLString},
    })
});

const MessageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: () => ({
      _id: { type: GraphQLString },
      text: { type: GraphQLString },
      sender: { type: GraphQLString },
      sender_name:{type: GraphQLString},
      channel: { type: GraphQLString },
    })
});

const ChannelType = new GraphQLObjectType({
    name: 'ChannelType',
    fields: () => ({
        _id: { type: GraphQLString },
        channel_name: { type: GraphQLString }, //not needed remove
        messages: { type: new GraphQLList(MessageType) },
        message: { type: MessageType },
        users: { type: new GraphQLList(UserType) },
        users: { type: UserType },
        facilitator: { type: FacilitatorType },
    })
});

const FacilitatorType = new GraphQLObjectType({
    name: 'FacilitatorType',
    fields: () => ({
      _id: { type: GraphQLString },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      channels: { type: new GraphQLList(ChannelType) },
      assigned_to: { type: UserType },
      is_available: { type: GraphQLBoolean },
      is_assigned: { type: GraphQLBoolean },
    })
});

module.exports = {UserType, MessageType, ChannelType, FacilitatorType};