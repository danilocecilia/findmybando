const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mlab database
mongoose.connect('mongodb://admin:teste123@ds153394.mlab.com:53394/fmbando');
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true   
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});