const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} = require('graphql');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    listId: { type: GraphQLString },
    itemId: { type: GraphQLString },
    itemDescription: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    completed: { type: GraphQLBoolean },
  }),
});

module.exports = ItemType;
