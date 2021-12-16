var {GraphQLNonNull, GraphQLString} = require('graphql');
var {UserType,ChannelType,MessageType} = require('../types/TypeDefs');
const Message = require('../../../models/MessageModel');


const sendMessage = {
    type: MessageType,
    args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        sender: { type: new GraphQLNonNull(GraphQLString) },
        channel: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        let message = new Message(params);
        return message.save();
    }
}

module.exports = {sendMessage}

