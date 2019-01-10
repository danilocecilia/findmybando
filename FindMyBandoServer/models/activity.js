const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userId: String,
    description: String,
    creationDate: String
});

module.exports = mongoose.model('Activity', activitySchema);