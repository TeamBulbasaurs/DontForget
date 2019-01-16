const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const ListGroupType = new GraphQLObjectType({
  name: 'ListUser',
  fields: () => ({
    listId: { type: GraphQLString },
    userId: { type: GraphQLString },
  }),
});

module.exports = ListGroupType;
