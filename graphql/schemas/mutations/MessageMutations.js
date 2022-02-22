var {GraphQLNonNull, GraphQLString} = require('graphql');
var {UserType,ChannelType,MessageType} = require('../types/TypeDefs');
const Message = require('../../../models/MessageModel');
const User = require('../../../models/UserModel');


const sendMessage = {
    type: MessageType,
    args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        senderId: { type: new GraphQLNonNull(GraphQLString) },
        channelId: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res,pubsub}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }

        let message = new Message({
            text: params.text,
            sender_id: params.senderId,
            channel_id: params.channelId,
        });
        

        pubsub.publish(params.channelId, { channelUpdates: {message:message} });
        return message.save();
    }
}

module.exports = {sendMessage}

