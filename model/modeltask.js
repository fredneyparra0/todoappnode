const mongoose = require('mongoose');

const schemaTask = new mongoose.Schema({
    check: Boolean,
    id: Number,
    titulo: String
})

const modelTask = mongoose.model('tasks', schemaTask);

module.exports = modelTask;