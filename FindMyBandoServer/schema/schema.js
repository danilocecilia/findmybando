const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

//dummy data
var activities = [
  {
    id: "1",
    userId: "1",
    description: "Fav Place",
    creationDate: "01/01/2019" 
  },
  {
    id: "2",
    userId: "2",
    description: "Sec Place",
    creationDate: "02/01/2019"
  },
  {
    id: "3",
    userId: "3",
    description: "Third Place",
    creationDate: "03/01/2019"
  }
];

var users = [
  {
    id: "1",
    name: "Danilo Cecilia",
    pilotName: "Cyber FPV",
    email: "cyber@gmail.com",
    picture: "path.png"
  },
  {
    id: "2",
    name: "Mariana Cecilia",
    pilotName: "Mari FPV",
    email: "mari@gmail.com",
    picture: "path.png"
  },
  {
    id: "3",
    name: "Nicholas Cecilia",
    pilotName: "Nick FPV",
    email: "nick@gmail.com",
    picture: "path.png"
  }
];

var photos = [
  {
    id: "1",
    name: "image01",
    path: "photo.jpg",
    activityId: "1"
  },
  {
    id: "2",
    name: "image02",
    path: "photo01.jpg",
    activityId: "1"
  },
  {
    id: "3",
    name: "image03",
    path: "photo02.jpg",
    activityId: "2"
  }
]

const ActivitiesType = new GraphQLObjectType({
  name: "Activity",
  fields: () => ({
    id: { type: GraphQLID },
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
        return _.find(activities, { id: args.id });
      }
    },
    user: {
      type: UsersType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return _.find(users, { id: args.id });
      }
    },
    photo: {
      type: PhotoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db / other source
        return _.find(photos, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
