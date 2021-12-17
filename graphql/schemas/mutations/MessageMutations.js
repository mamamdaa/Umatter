var {GraphQLNonNull, GraphQLString} = require('graphql');
var {UserType,ChannelType,MessageType} = require('../types/TypeDefs');
const Message = require('../../../models/MessageModel');
const User = require('../../../models/UserModel');


const sendMessage = {
    type: MessageType,
    args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        sender: { type: new GraphQLNonNull(GraphQLString) }, //change to senderid
        channel: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async function (root, params,{req, res}) {
        // if(!req.isAuth) {
        //   res.status(401)
        //   throw new Error("Not Authenticated");
        // }
        const user = await User.findOne({_id:params.sender})
        if(!user) {
            throw new Error('User not found');
        }
        params.sender_name = user.first_name;
        let message = new Message(params);
        return message.save();
    }
}

module.exports = {sendMessage}

