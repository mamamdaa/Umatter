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

    if (user.is_in_queue === false) {
      throw new Error("User is not in queue");
    }

    user.is_assigned = true;
    user.is_in_queue = false;

    facilitator.is_assigned = true;
    facilitator.is_available = false;
    facilitator.channel_id = params.channelId;

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
    pubsub.publish(channel._id, {
      channelUpdates: { facilitator: facilitator },
    });
    user.action = "LEFT"
    pubsub.publish('QUEUE_UPDATE', { queueUpdate:user });


    return channel;
  },
};

/**
 * @brief clean Room before leaving
 * @param {string} channelId
 *
 */
const cleanRoom = {
  type: ChannelType,
  args: {
    channelId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (root, params, { req, res,pubsub }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    let channel = await Channel.findOneAndDelete({ _id: params.channelId });

    if (!channel) {
      throw new Error("Channel not found");
    }

    let facilitator = await Facilitator.findOneAndUpdate(
      { _id: channel.facilitator },
      {
        $set: {
          is_assigned: false,
          is_available: true,
          channel_id: null,
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
          channel_id: null,
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

    pubsub.publish( params.channelId, {
      channelUpdates: { isChannelExists: false },
    });

    return channel;
  },
};

module.exports = { cleanRoom, faciEnterRoom };
