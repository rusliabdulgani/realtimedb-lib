import { Socket, io } from 'socket.io-client'
import { FHISocketIO } from '../src/socketio.module'
import express from 'express'
import { createServer } from 'http'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { assert } from 'chai'
import { Socket as SocketServer } from 'socket.io'

describe('FHI Realtime DB Project', () => {
  let ioServer: FHISocketIO
  let serverSocket: SocketServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  let clientSocket: Socket<DefaultEventsMap, DefaultEventsMap>
  let port: Number = 3000
  before((done) => {
    const app = express()
    const httpServer = createServer(app)
    ioServer = new FHISocketIO(httpServer)
    httpServer.listen(() => {
      const testServer = `http://localhost:${port}`
      clientSocket = io(testServer)
      ioServer.io.on("connection", (socket) => {
        serverSocket = socket
      });
      clientSocket.on("connect", done);
    })
    done()
  })

  after(() => {
    ioServer.io.close
    clientSocket.close()
  });

  it("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      assert.equal(arg, "world");
      done();
    });
    serverSocket.emit("hello", "world")
  });

})