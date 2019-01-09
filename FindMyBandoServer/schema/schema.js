const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql; 

const ActivitiesType = new GraphQLObjectType({
    name: 'Activity',
    fields: () => ({
        id: { type: GraphQLString },
        creatorName: { type: GraphQLString },
        title: { type: GraphQLString },
        creationDate: { type: GraphQLString }
    })
})