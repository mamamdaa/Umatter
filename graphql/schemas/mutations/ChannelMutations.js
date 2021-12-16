var {GraphQLNonNull, GraphQLString} = require('graphql');
const { ChannelType} = require('../types/TypeDefs');
const Channel = require('../../../models/ChannelModel');

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
        channel_id: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        let channel = await Channel.findById(params.channel_id);
        if(!channel) {
            throw new Error('Channel not found');
        }
        channel.users.push(params.user_id);
        return channel.save();
    }
}



module.exports = {createChannel,addUserToChannel}