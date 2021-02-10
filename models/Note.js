const mongoose = require('mongoose')

// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      unique: true,
      maxlength: [500, 'Title cannot be more than 500 characters'],
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
    isPrivate: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)
