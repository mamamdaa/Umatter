var { 
  GraphQLNonNull, 
  GraphQLString,
GraphQLBoolean } = require("graphql");
const { FacilitatorType } = require("../types/TypeDefs");
const Facilitator = require("../../../models/FacilitatorModel");
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
    const updatedFacilitator = await Facilitator.findByIdAndUpdate(param._id, updateFacilitator, {
      new: true,
    });
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
      pubsub.publish(NEW_LOGIN, { newLogin: { _id: "123" } });

      return convertedFacilitator;
    }
  },
};

const joinChannelFacilitator = {
  name: "joinChannelFacilitator",
  type: FacilitatorType,
  args: {
    _id: { type: GraphQLString },
    channel_id: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res }) {
    const newFacilitator = await Facilitator.findOneAndUpdate(
      { _id: params._id },
      {
        $addToSet : {
            channels: params.channel_id
        }
      },
      {
        new: true,
      }
    );
    return newFacilitator
  },

};

// const enterQueue = {
//   name: "enterQueue",
//   type: FacilitatorType,
//   args: {
//     _id: { type: GraphQLString },
//   },
//   resolve: async function (root, params, { req, res }) {
//     const newFacilitator = await Facilitator.findOneAndUpdate(
//       { _id: params._id },
//       {
//         $set: {
//           is_in_queue: true,
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     return newFacilitator
//   }
// }

// const leaveQueue = {
//   name: "leaveQueue",
//   type: FacilitatorType,
//   args: {
//     _id: { type: GraphQLString },
//   },
//   resolve: async function (root, params, { req, res }) {
//     const newFacilitator = await Facilitator.findOneAndUpdate(
//       { _id: params._id },
//       {
//         $set: {
//           is_in_queue: false,
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     return newFacilitator
//   }
// }

const assignedToUser = {
  name: "assignedToUser",
  type: FacilitatorType,
  args: {
    _id: { type: GraphQLString },
    assigned_to: { type: GraphQLString },
  },
  resolve: async function (root, params, { req, res }) {
    const newFacilitator = await Facilitator.findOneAndUpdate(
      { _id: params._id },
      {
        $set: {
          assigned_to: params.assigned_to,
        },
      },
      {
        new: true,
      }
    );
    return newFacilitator
  }
}

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

module.exports = { addFacilitator, updateFacilitator, loginFacilitator, joinChannelFacilitator, assignedToUser };
