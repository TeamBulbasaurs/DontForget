const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

// Connect to DB
const db = require('../db');

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
        return db.oneOrNone(
          'SELECT * FROM "Items" WHERE "listId" = $1 AND "itemId" = $2',
          [args.listId, args.itemId],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    items: {
      type: new GraphQLList(ItemType),
      args: {
        listId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve all Items for a specific List
        return db.manyOrNone(
          'SELECT * FROM "Items" WHERE "listId" = $1',
          [args.listId],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    listUsers: {
      type: new GraphQLList(ListGroupType),
      args: {
        listId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve list of Users belonging to a List
        return db.manyOrNone(
          'SELECT * FROM "ListGroup" WHERE "listId" = $1',
          [args.listId],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    list: {
      type: ListType,
      args: {
        listId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve a specific List
        return db.oneOrNone('SELECT * FROM "Lists" WHERE "listId" = $1', [args.listId])
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    lists: {
      type: new GraphQLList(ListType),
      resolve(parentValue, args) {
        // Retrieve all Lists
        return db.manyOrNone('SELECT * FROM "Lists"')
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    user: {
      type: UserType,
      args: {
        userId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve a specific User
        return db.oneOrNone('SELECT * FROM "Users" WHERE "userId" = $1', [args.userId])
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
