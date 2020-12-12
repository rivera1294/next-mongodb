import { actionTypes as eTypes } from '~/utils/socket/actionTypes'

export function socketLogic(io) {
  io.on('connection', function (socket) {
    console.log('=== Somebody connected ===')

    // socket.broadcast.emit('user connected');

    socket.emit(eTypes.USER_CONNECTED, { message: 'hello world' })

    socket.on('disconnect', function () {
      console.log('=== Somebody disconnected ===')
    })
  })
  return io
}
