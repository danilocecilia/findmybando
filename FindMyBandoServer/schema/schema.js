const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const Activity = require('../models/activity');
const User = require('../models/user');
const Photo = require('../models/photo');

const ActivitiesType = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    description: { type: GraphQLString },
    creationDate: { type: GraphQLString },
    user: {
      type: UsersType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId });
      }
    },
    photos: {
      type: new GraphQLList(PhotoType),
      resolve(parent, args) {
        return _.filter(photos, { id: parent.id })
      }
    }
  })
});

const UsersType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pilotName: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: GraphQLString }
  })
});

const PhotoType = new GraphQLObjectType({
  name: "Photo",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    path: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    activity: {
      type: ActivitiesType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        //return _.find(activities, { id: args.id });
      }
    },
    user: {
      type: UsersType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        //return _.find(users, { id: args.id });
      }
    },
    photo: {
      type: PhotoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        //return _.find(photos, { id: args.id });
      }
    },
    users: {
      type: GraphQLList(UsersType),
      resolve(parent, args) {
        //code to get data from db / other source
        //return users;
      }
    },
    activities: {
      type: GraphQLList(ActivitiesType),
      resolve(parent, args) {
        //return activities;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addActivity: {
      type: ActivitiesType,
      args: {
        userId: { type: GraphQLID },
        description: { type: GraphQLString },
        creationDate: { type: GraphQLString }
      },
      resolve(parent, args) {
        let activity = new Activity({ 
          userId: args.userId,
          description: args.description,
          creationDate: args.creationDate
        });

        return activity.save();
      }
    },
    addUser: {
      type: UsersType,
      args: {
        name: { type: GraphQLString },
        pilotName: { type: GraphQLString },
        email: { type: GraphQLString },
        picture: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          pilotName: args.pilotName,
          email: args.email,
          picture: args.picture
        });

        return user.save();
      }
    },
    addPhoto: {
      type: PhotoType,
      args: {
        name: { type: GraphQLString },
        path: { type: GraphQLString }
      },
      resolve(parent, args) {
        let photo = new Photo({
          name: args.name,
          path: args.path
        });

        return photo.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
