var { GraphQLNonNull, GraphQLString } = require("graphql");
const { ChannelType, UserType, FacilitatorType } = require("../types/TypeDefs");
const Channel = require("../../../models/ChannelModel");
const Facilitator = require("../../../models/FacilitatorModel");
const User = require("../../../models/UserModel");


const faciEnterRoom = {
  type: ChannelType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    channelId: { type: new GraphQLNonNull(GraphQLString) },
    facilitatorId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }

    let channel = await Channel.findById(params.channelId);
    if (!channel) {
      throw new Error("Channel not found");
    }

    let facilitator = await Facilitator.findById(params.facilitatorId);
    if (!facilitator) {
      throw new Error("Facilitator not found");
    }

    let user = await User.findById(params.userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.is_assigned = true;
    user.is_in_queue = false;

    facilitator.is_assigned = true;
    facilitator.is_available = false;

    channel.facilitator = facilitator._id;

    user.save();
    facilitator.save();
    channel.save();

    /**
     * @brief Publish a update to the channel when faci enters room
     * @param {string} user_id
     * @param {string} channel_id
     *
     */
    pubsub.publish(channel._id, { channelUpdate: {facilitator:facilitator}});

    return channel;
  },
};

const cleanRoom = {
  type: ChannelType,
  args: {
    channelId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    let channel = await Channel.findOneAndDelete({ _id: params.channelId });
    if (!channel) {
      throw new Error("Channel not found");
    }
    let facilitator = await Facilitator.findOneAndUpdate(
      { _id: channel.createdBy },
      {
        $set: {
          is_assigned: false,
          is_available: true,
        },
      },
      {
        new: true,
      }
    );
    if (!facilitator) {
      throw new Error("Facilitator not found");
    }

    let user = await User.findOneAndUpdate(
      { _id: channel.user },
      {
        $set: {
          channel: null,
          is_assigned: false,
          is_in_queue: false,
        },
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return channel;
  },
};

module.exports = { cleanRoom, faciEnterRoom};
