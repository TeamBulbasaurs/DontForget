const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

// Custom Types
const ItemType = require('../types/ItemType');
const ListGroupType = require('../types/ListGroupType');
const ListType = require('../types/ListType');
const UserType = require('../types/UserType');

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    item: {
      type: ItemType,
      args: {
        listId: { type: GraphQLString },
        itemId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve a specific Item belonging to a specific List
      },
    },
    items: {
      type: new GraphQLList(ItemType),
      args: {
        listId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve all Items for a specific List
      },
    },
    listUsers: {
      type: new GraphQLList(ListGroupType),
      args: {
        listId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve list of Users belonging to a List
      },
    },
    list: {
      type: ListType,
      args: {
        listId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve a specific List
      },
    },
    lists: {
      type: new GraphQLList(ListType),
      resolve(parentValue, args) {
        // Retrieve all Lists
      },
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve a specific User
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
