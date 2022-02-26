var { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const { FacilitatorType } = require("../types/TypeDefs");
const Facilitator = require("../../../models/FacilitatorModel");
const User = require("../../../models/UserModel");
const generateToken = require("../../../utils/GenerateToken");

const addFacilitator = {
  type: FacilitatorType,
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
    let facilitator = await Facilitator.findOne({ email: params.email });
    if (facilitator) {
      res.status(400);
      throw new Error("Facilitator already exists!");
    }
    const facilitatorModel = new Facilitator(params);
    const newFacilitator = await facilitatorModel.save();
    if (!newFacilitator) {
      throw new Error("Error");
    }
    return newFacilitator;
  },
};

const updateFacilitator = {
  type: FacilitatorType,
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
    let updateFacilitator = {};
    if (param.name) {
      updateFacilitator.name = param.name;
    }
    if (param.email) {
      updateFacilitator.email = param.email;
    }
    const updatedFacilitator = await Facilitator.findByIdAndUpdate(
      param._id,
      updateFacilitator,
      {
        new: true,
      }
    );
    console.log(updatedFacilitator);
    if (!updatedFacilitator) {
      throw new Error("Error");
    }
    return updatedFacilitator;
  },
};
const NEW_LOGIN = "NEW_LOGIN";
const loginFacilitator = {
  name: "loginFacilitator",
  type: FacilitatorType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    const facilitator = await Facilitator.findOne({ email: params.email });
    if (!facilitator || !(await facilitator.isMatchPassword(params.password))) {
      res.status(400);
      throw new Error("Invalid email or password");
    } else {
      let convertedFacilitator = facilitator.toJSON();
      convertedFacilitator.token = generateToken(convertedFacilitator._id);
      delete convertedFacilitator.password;

      facilitator.is_available = true;
      facilitator.is_assigned = false;
      facilitator.save();

      pubsub.publish(NEW_LOGIN, { newLogin: { _id: "123" } });

      return convertedFacilitator;
    }
  },
};

const faciLeaveRoom = {
  name: "faciLeaveRoom",
  type: FacilitatorType,
  args: {
    clientId: { type: GraphQLString },
    channelId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    let facilitator = await Facilitator.findById(params.clientId);
    let user = await User.findById(params.userId);
    if (!facilitator) {
      throw new Error("Facilitator not found");
    }
    if (!user) {
      throw new Error("User not found");
    }
    facilitator.is_assigned = false;
    facilitator.is_available = true;
    facilitator.channel = null;
    facilitator.assigned_to = null; 
    facilitator.save();
    user.is_assigned = false;
    user.assigned_to = null;
    user.save();
    facilitator.action = "LEFT";
    pubsub.publish(params.channelId, {
      channelUpdates: { facilitator: facilitator },
    });

    await facilitator;
  },
};

const faciJoinRoom = {
  name: "faciJoinRoom",
  type: FacilitatorType,
  args: {
    clientId: { type: GraphQLString },
    channelId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res, pubsub }) {
    let facilitator = await Facilitator.findById(params.clientId);

    if (!facilitator) {
      throw new Error("Facilitator not found");
    }
    let user = await User.findById(params.userId);
    if (!user) {
      throw new Error("User not found");
    }

    facilitator.is_assigned = true;
    facilitator.is_available = false;
    facilitator.channel_id = params.channelId;
    facilitator.assigned_to = user._id;
    facilitator.save();
    user.is_assigned = true;
    user.is_in_queue = false;
    user.assigned_to = facilitator._id;
    user.save();

    user.action = "LEFT";
    facilitator.action = "JOINED";

    pubsub.publish(params.channelId, {
      channelUpdates: { facilitator: facilitator },
    });
    pubsub.publish("QUEUE_UPDATE", { queueUpdate:user });
    return facilitator;
  },
};

// const deleteFacilitator = {
//     type: FacilitatorType,
//     args: {
//         _id: {
//             name: '_id',
//             type: new GraphQLNonNull(GraphQLString)
//         }
//     },
//     resolve: async function (root, param) {
//       const deleteFacilitator =  await Facilitator.findByIdAndRemove(param._id)
//       if(!deleteFacilitator) {
//          throw new Error('Error');
//       }
//       return deleteFacilitator
//     }
// }

module.exports = {
  addFacilitator,
  updateFacilitator,
  loginFacilitator,
  faciLeaveRoom,
  faciJoinRoom,
};
