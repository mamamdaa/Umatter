var { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const { UserType } = require("../types/TypeDefs");
const User = require("../../../models/UserModel");
const Channel = require("../../../models/ChannelModel");
const Facilitator = require("../../../models/FacilitatorModel");
const generateToken = require("../../../utils/GenerateToken");

const addUser = {
  type: UserType,
  args: {
    first_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    last_name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (root, params, { req, res }) {
    console.log("params", params);
    let user = await User.findOne({ email: params.email });
    if (user) {
      console.log("userexist");
      res.status(400);
      throw new Error("User already exists!");
    }
    const userModel = new User(params);
    const newUser = await userModel.save();
    if (!newUser) {
      throw new Error("Error");
    }
    return newUser;
  },
};

const updateUser = {
  type: UserType,
  args: {
    _id: {
      name: "_id",
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      name: "name",
      type: GraphQLString,
    },
    email: {
      name: "email",
      type: GraphQLString,
    },
  },
  resolve: async function (root, param) {
    let updateUser = {};
    if (param.name) {
      updateUser.name = param.name;
    }
    if (param.email) {
      updateUser.email = param.email;
    }
    const uUser = await User.findByIdAndUpdate(param._id, updateUser, {
      new: true,
    });
    console.log(uUser);
    if (!uUser) {
      throw new Error("Error");
    }
    return uUser;
  },
};
const NEW_LOGIN = "NEW_LOGIN";
const login = {
  name: "login",
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    const user = await User.findOne({ email: params.email });
    if (!user || !(await user.isMatchPassword(params.password))) {
      console.log("error", user);
      res.status(400);
      throw new Error("Invalid email or password");
    } else {
      let convertedUser = user.toJSON();
      convertedUser.token = generateToken(convertedUser._id);
      delete convertedUser.password;
      user.is_in_queue = false;
      user.is_assigned = false;

      user.save();

      //   console.log("convertedUser",pubsub.subscriptions['1'][1])
      pubsub.publish(NEW_LOGIN, { newLogin: { _id: "123" } });

      return convertedUser;
    }
  },
};

const joinChannel = {
  name: "joinChannel",
  type: UserType,
  args: {
    _id: { type: GraphQLString },
    channel_id: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res }) {
    const newUser = await User.findOneAndUpdate(
      { _id: params.userId },
      {
        $addToSet: {
          channels: params.channel_id,
        },
      },
      {
        new: true,
      }
    );
    return newUser;
  },
};

const userEnterQueue = {
  name: "userEnterQueue",
  type: UserType,
  args: {
    userId: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    let channel = new Channel({
      channel_name: params.userId,
      user: params.userId,
      facilitator: null,
    });

    let newChannel = await channel.save();
    let newUser = await User.findOne({ _id: params.userId });

    if (!newUser) {
      throw new Error("No User Found");
    }
    if (newUser.is_in_queue) {
      res.status(400);
      throw new Error("User is already in queue");
    }
    newUser.is_in_queue = true;
    newUser.is_assigned = false;
    newUser.channel_id = newChannel._id;
    newUser.save();

    newUser.action = "JOINED";
    pubsub.publish("QUEUE_UPDATE", { queueUpdate: newUser });
    return newUser;
  },
};

/**
 * @brief : When user leave the queue before the facilitator enter room
 */
const userLeaveQueue = {
  name: "userLeaveQueue",
  type: UserType,
  args: {
    userId: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    let user = await User.findOne({ _id: params.userId });
    if (!user) {
      throw new Error("No User Found");
    }
    user.is_in_queue = false;
    user.is_assigned = false;
    user.channel_id = null;
    user.save();
    user.action = "LEFT";
    pubsub.publish("QUEUE_UPDATE", { queueUpdate: user });
    return user;
  },
};

const userLeaveRoom = {
  name: "userLeaveRoom",
  type: UserType,
  args: {
    userId: { type: GraphQLString },
    channelId: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    let user = await User.findOne({ _id: params.userId });
    if (!user) {
      throw new Error("No User Found");
    }
    user.is_in_queue = false;
    user.is_assigned = false;
    user.channel_id = null;
    user.save();
    user.action = "LEFT";
    pubsub.publish(params.channelId, { channelUpdates: { user: user } });
    return user;
  },
};

// const deleteUser = {
//     type: UserType,
//     args: {
//         _id: {
//             name: '_id',
//             type: new GraphQLNonNull(GraphQLString)
//         }
//     },
//     resolve: async function (root, param) {
//       const deleteUser =  await User.findByIdAndRemove(param._id)
//       if(!deleteUser) {
//          throw new Error('Error');
//       }
//       return deleteUser
//     }
// }

module.exports = {
  addUser,
  updateUser,
  login,
  joinChannel,
  userEnterQueue,
  userLeaveQueue,
  userLeaveRoom,
};
