const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const ListType = new GraphQLObjectType({
  name: 'List',
  fields: () => ({
    listId: { type: GraphQLString },
    listName: { type: GraphQLString },
    notes: { type: GraphQLString },
  }),
});

module.exports = ListType;
