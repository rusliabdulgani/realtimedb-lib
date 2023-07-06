import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Server, Socket } from 'socket.io'

class FHISocketIO {
  server: any
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined
  error: any
  constructor(server: any) {
    this.server = server
    this.io = new Server(server)
    this.handleConnection.bind(this)
    this.listenConnection.bind(this)
  }

  listenConnection(io: Server): Promise<Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined> {
    return new Promise((resolve, reject) => {
      io.on('connection', (socket) => {
        console.log('user connected!')
        resolve(socket);
      });

      // Handle potential errors or timeouts
      io.on('error', (error) => {
        reject(error);
      });
    });
  }

  async handleConnection() {
    try {
      const socket = await this.listenConnection(this.io);
      this.socket = socket
    } catch (e: any) {
      this.error = e
    }
  }


}

export { FHISocketIO }