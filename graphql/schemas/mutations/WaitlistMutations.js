var { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");
const { WaitlistType } = require("../types/TypeDefs");
const Waitlist = require("../../../models/WaitlistModel");

const addToWaitlist = {
  type: WaitlistType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async function (root, params) {
    let user = await Waitlist.findOne({ email: params.email });

    if (user) {
      throw new Error("User already in waitlist");
    }
    
    let waitlist = new Waitlist({
      email: params.email,
    });
    return waitlist.save();
  },
};

module.exports = {
  addToWaitlist,
};
