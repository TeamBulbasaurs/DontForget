const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    userId: { type: GraphQLString },
    userName: { type: GraphQLString },
    userEmail: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = UserType;
