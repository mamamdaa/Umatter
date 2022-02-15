const graphql = require("graphql");
const { MessageType } = require("../types/TypeDefs");
const Facilitator = require("../../../models/FacilitatorModel");
const User = require("../../../models/UserModel");
const Channel = require("../../../models/ChannelModel");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const newMessage = {
  name: "newMessage",
  type: MessageType,
  args: {
    channel: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    is_facilitator: {
      type: GraphQLString,
    },
  },
  subscribe: (_, params, { pubsub }) => {
    let channel = Channel.findOne({ _id: params.channel });
    if (!channel) {
      throw new Error("Channel not found");
    }

    if (params.is_facilitator === "true") {
      let facilitator = Facilitator.findOne({ _id: params.id });

      if (!facilitator) {
        throw new Error("Facilitator not found");
      }

      if (facilitator._id !== channel.createdBy) {
        throw new Error("Facilitator not found in this channel");
      }

      return pubsub.asyncIterator(params.channel);
    } else {
      let user = User.findOne({ _id: params.id });

      if (!user) {
        throw new Error("User not found");
      }

      if (!channel.users.includes(user._id)) {
        throw new Error("User not found in this channel");
      }

      return pubsub.asyncIterator(params.channel);
    }
  },
};

module.exports = { newMessage };
