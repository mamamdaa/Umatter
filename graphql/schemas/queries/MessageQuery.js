const graphql = require('graphql');
const {MessageType,ChannelType} = require('../types/TypeDefs');
const Message = require('../../../models/MessageModel');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
  } = graphql

const getMessages = {
    name: 'getMessages',
    type: new GraphQLList(MessageType),
    args: {
      channel: {type: ChannelType},
    },
    resolve: async function (root, params,{req, res}) {
      // if(!req.isAuth) {
      //   res.status(401)
      //   throw new Error("Not Authenticated");
      // }
      return Message.find({channel: params.channel})
    }
  }
  
module.exports = {getMessages}