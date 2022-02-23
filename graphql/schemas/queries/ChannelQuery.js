const graphql = require("graphql");
const { MessageType, ChannelType } = require("../types/TypeDefs");
const Channel = require("../../../models/ChannelModel");
const Message = require("../../../models/MessageModel");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const getChannels = {
  name: "getChannels",
  type: new GraphQLList(ChannelType),
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return Channel.find({});
  },
};

const getMessagesFromChannel = {
  name: "getMessagesFromChannel",
  type: new GraphQLList(MessageType),
  args: {
    channel_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return Message.find({ channel_id: params.channel_id });
  },
};

module.exports = { getChannels, getMessagesFromChannel };
