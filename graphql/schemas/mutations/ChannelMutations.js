var {GraphQLNonNull, GraphQLString} = require('graphql');
const { ChannelType, UserType, FacilitatorType} = require('../types/TypeDefs');
const Channel = require('../../../models/ChannelModel');
const Facilitator = require('../../../models/FacilitatorModel');
const User = require('../../../models/UserModel');

const createChannel = {
    type: ChannelType,
    args: {
        channel_name: { type: new GraphQLNonNull(GraphQLString) },
        createdBy: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        let channel = new Channel(params);
        return channel.save();
    }
}
//change function
const addUserToChannel = {
    type: ChannelType,
    args: { 
        facilitator_id: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLString) },

    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        
        if(!channel) {
            throw new Error('Channel not found');
        }
        channel.users.push(params.user_id);
        return channel.save();
    }
}

const createRoom = {
    type: ChannelType,
    args: {
        createdBy: { type: new GraphQLNonNull(GraphQLString) },
        user : { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        let channel = new Channel({
            channel_name: "test",
            createdBy: params.createdBy,
            user: params.user,
        });

        channel.save();

        let facilitator = await Facilitator.findOneAndUpdate(
            { _id: params.createdBy },
            {
                $set: {
                    is_in_queue: false,
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
            { _id: params.user },
            {
                $set: {
                    channel: channel._id,
                    is_in_queue: false,
                },
            },
            {
                new: true,
            }
        );
        if(!user) {
            throw new Error('User not found');
        }

        return channel;
    }
}




module.exports = {createChannel,addUserToChannel,createRoom}