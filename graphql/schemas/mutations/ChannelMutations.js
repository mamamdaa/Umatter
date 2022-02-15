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
    resolve: async function (root, params,{req, res,pubsub}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        let channel = new Channel({
            channel_name: "test",
            createdBy: params.createdBy,
            user: params.user,
        });



        let facilitator = await Facilitator.findOne({
            _id: params.createdBy,
            is_assigned: false, 
            is_available: true

        });

        if (!facilitator) {
            throw new Error("Facilitator not found or already assigned");
        }else{
            facilitator.is_assigned = true;
            facilitator.is_available = false;
        }
            

        let user = await User.findOne({
            _id: params.user, 
            is_in_queue: true, 
            is_assigned: false
        });
        

        if (!user) {
            throw new Error("User not found or already assigned");
        }else{
            user.is_assigned = true;
            user.is_in_queue = false;
            user.channel = channel._id;
        }


        user.save();
        facilitator.save();
        channel.save();

        /**
         * @brief Publish a message to the user queue channel
         * @param {string} user_id
         * @param {string} channel_id
         * 
         */
        pubsub.publish(user._id, { queueUpdate: user});
        
        return channel;
    }
}

const cleanRoom = {
    type: ChannelType,
    args: {
        channel_id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        let channel = await Channel.findOneAndDelete({ _id: params.channel_id });
        if(!channel) {
            throw new Error('Channel not found');
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
        if(!user) {
            throw new Error('User not found');
        }

        return channel;
    }
}
                    




module.exports = {createChannel,addUserToChannel,createRoom,cleanRoom}