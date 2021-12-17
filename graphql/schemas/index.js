const UserQuery = require('./queries/UserQuery');
const ChannelQuery = require('./queries/ChannelQuery');
const UserMutation = require('./mutations/UserMutation');
const ChannelMutations = require('./mutations/ChannelMutations');
const MessageMutations = require('./mutations/MessageMutations');
const UserSubscription = require('./subscriptions/UserSubscription');
const ChannelSubscription = require('./subscriptions/ChannelSubscription');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} = graphql

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {...UserQuery,...ChannelQuery}
    
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {...UserMutation,...ChannelMutations,...MessageMutations}
});

const Subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {...UserSubscription,...ChannelSubscription}
});
// console.log('combine', {
//   ...MessageMutations,
//   ...ChannelMutations,
// });
const schema = new graphql.GraphQLSchema({query:Query,mutation:Mutation,subscription:Subscription});

module.exports = schema;