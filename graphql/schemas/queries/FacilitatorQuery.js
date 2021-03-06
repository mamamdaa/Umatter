const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = graphql;
const {
  MessageType,
  ChannelType,
  FacilitatorType,
} = require("../types/TypeDefs");
const Facilitator = require("../../../models/FacilitatorModel");

const getFacilitators = {
  type: new GraphQLList(FacilitatorType),
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return Facilitator.find({});
  },
};

const getFacilitator = {
  type: FacilitatorType,
  args: {
    clientId: {
      type: GraphQLString,
    },
  },
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }

    let facilitator = await Facilitator.findById(params.clientId).select("-password");;
    if (!facilitator) {
      throw new Error("Facilitator not found");
    }
    return facilitator;
  },
};

const getAvailableFacilitators = {
  type: new GraphQLList(FacilitatorType),
  resolve: async function (root, params, { req, res }) {
    // if(!req.isAuth) {
    //   res.status(401)
    //   throw new Error("Not Authenticated");
    // }
    return Facilitator.find({is_available: true}).select("-password");
  },
};


module.exports = { getFacilitators, getFacilitator, getAvailableFacilitators};
