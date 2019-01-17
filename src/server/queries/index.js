const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
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
    userLists: {
      type: new GraphQLList(ListType),
      args: {
        userId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        // Retrieve all Lists belonging to a particular user
        return db.manyOrNone(
          'SELECT "Lists"."listId", "Lists"."listName", "Lists"."notes"'
          + ' FROM "Lists", "ListGroup"'
          + ' WHERE "ListGroup"."userId" = $1'
          + ' AND "ListGroup"."listId" = "Lists"."listId"',
          [args.userId],
        )
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

// Mutation Query
const MutationQuery = new GraphQLObjectType({
  name: 'MutationQueryType',
  fields: {
    createList: {
      type: ListType,
      args: {
        listName: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // Create a new List
        return db.oneOrNone(
          'INSERT INTO "Lists" ("listName", "notes")'
          + ' VALUES ($1, $2)'
          + ' RETURNING "listId", "listName", "notes"',
          [args.listName, args.notes],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    createItem: {
      type: ItemType,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLString) },
        itemDescription: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLFloat) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(parentValue, args) {
        // Create an Item
        return db.oneOrNone(
          'INSERT INTO "Items" ("listId", "itemDescription", "quantity", "completed")'
          + ' VALUES ($1, $2, $3, $4)'
          + ' RETURNING "listId", "itemId", "itemDescription", "quantity", "completed"',
          [args.listId, args.itemDescription, args.quantity, args.completed],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    createListUser: {
      type: ListGroupType,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // Create a List User
        return db.oneOrNone(
          'INSERT INTO "ListGroup" ("listId", "userId")'
          + ' VALUES ($1, $2)'
          + ' RETURNING "listId", "userId"',
          [args.listId, args.userId],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    deleteList: {
      type: ListType,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // Delete a List
        return db.oneOrNone(
          'DELETE FROM "Lists" WHERE "listId" = $1',
          [args.listId],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    deleteItem: {
      type: ItemType,
      args: {
        itemId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // Delete an Item
        return db.oneOrNone(
          'DELETE FROM "Items" WHERE "itemId" = $1',
          [args.itemId],
        )
          .then(res => res)
          .catch((err) => {
            console.error('Error executing Query', err);
            return err;
          });
      },
    },
    deleteListUser: {
      type: ListGroupType,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        // Delete a List User
        return db.oneOrNone(
          'DELETE FROM "ListGroup" WHERE "listId" = $1 AND "userId" = $2',
          [args.listId, args.userId],
        )
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
  mutation: MutationQuery,
});
