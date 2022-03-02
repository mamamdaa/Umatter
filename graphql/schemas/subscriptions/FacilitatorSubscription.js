const graphql = require("graphql");
const { FacilitatorType } = require("../types/TypeDefs");
const Facilitator = require("../../../models/FacilitatorModel");
const User = require("../../../models/UserModel");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const availableFacilitatorsUpdate = {
  name: "availableFacilitatorsUpdate",
  type: FacilitatorType,
  args: {
    clientId: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
  },
  subscribe: (_, params, { pubsub }) => {
    let availableFacilitators = [];
    if (params.role == "facilitator") {
      let facilitator = Facilitator.find({
        _id: params.clientId,
      });
      if (!facilitator) {
        throw new Error("You are not a facilitator");
      }
    } else if (params.role == "user") {
      let user = User.find({
        _id: params.clientId,
      });
      if (!user) {
        throw new Error("You are not a user");
      }
    } else {
      throw new Error("You are not a user or facilitator");
    }

    availableFacilitators = Facilitator.find({
      is_available: true,
      is_assigned: false,
    });

    return pubsub.asyncIterator(["AVAILABLE_FACILITATORS_UPDATE"]);
  },
};

module.exports = {availableFacilitatorsUpdate}

