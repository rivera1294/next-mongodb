const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        maxlength: [100, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        // maxlength: [200, 'Description cannot be more than 200 characters']
    },
    priority: {
        type: Number,
        required: false,
    },
    isDone: {
        type: Boolean,
        required: false,
    },
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);
