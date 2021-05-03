const mongoose = require('mongoose');

const schemaTask = new mongoose.Schema({
    titulo: String,
    check: Boolean
})

const modelTask = mongoose.model('tasks', schemaTask);

module.exports = modelTask;