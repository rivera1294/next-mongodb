const mongoose = require('mongoose')

// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
