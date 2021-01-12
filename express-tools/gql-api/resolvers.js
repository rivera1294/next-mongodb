// const todos = require('./_fake-todos-data');
const Note = require('~/models/Note')

module.exports = {
  // Note: Каждая из функций должна вернуть тип в соотв. со схемой
  note: ({ id }) => Note.findById(id),
  notes: () => Note.find(),
  // completedNotes: () => Note.find({ completed: true }),
  // notesByStatus: ({ status }) => Note.find({ status }),
  // createNote: ({ input }) => Note.create(input),
  // updateNote: ({ id, input }) => {
  //   return Note.findByIdAndUpdate(id, input, {
  //     new: true, // Верни мне обновленный объект
  //   })
  // },
  // deleteNote: ({ id }) => {
  //   return Note.deleteOne({ _id: id }).then((note) => note)
  // },
}
