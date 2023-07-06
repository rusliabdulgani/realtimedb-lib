import { FHISocketIO } from "./socketio.module";

export default FHISocketIO
// import { Server, Socket } from 'socket.io'
// import express from 'express'
// import http from 'http'
// import { DefaultEventsMap } from "socket.io/dist/typed-events";

// const app = express();
// const server = http.createServer(app);
// const fhiSocketIOInstance = new FHISocketIO(server)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/src/index.html');
// });

// let socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined
// let error: any

// (async function connection() {
//   try {
//     await fhiSocketIOInstance.handleConnection()
//     socket = fhiSocketIOInstance.socket

//     if (socket) {
//       socket.on('message', (msg: String) => {
//         console.log('message', msg)
//         fhiSocketIOInstance.io.emit('message', msg)
//       })

//       socket.on('disconnect', () => {
//         console.log('user disconected!')
//       })
//     }
//   } catch (e) {
//     console.log('error')
//     error = fhiSocketIOInstance.error
//   }
// })()



// const port = 3000
// server.listen(port, () => {
//   console.log('server already running on port ' + port)
// })
