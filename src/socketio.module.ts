import { Server } from 'socket.io'
import { createClient } from "redis"
import { createAdapter } from "@socket.io/redis-streams-adapter";
import {
  WrapperOptions,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  RedisClientType
} from '@interfaces';

class SocketIOServerWrapper {
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
  private redisClient!: RedisClientType

  constructor(server: any, options: WrapperOptions) {
    this.io = new Server(server, {});
    this.listen = this.listen.bind(this)

    if (options.adapter && options.adapter.redisServer) {
      this.initRedisStreamAdapter(options.adapter.redisServer)
    }
  }

  async initRedisStreamAdapter(redisServer: string) {
    const redisClient = createClient({ url: redisServer })
    this.redisClient = redisClient
    await redisClient.connect()
    const adapter = createAdapter(redisClient)
    this.io.adapter(adapter)
  }

  listen(event: any, handler: (msg: string) => void) {
    this.io.on('connection', (socket) => {
      socket.on(event, async (data: string) => {
        const response = await handler(data);
        this.insertToRedisStream(event, response)
        socket.emit(event, response);
      });
    });
  }

  onStreamChange(streamName: string, callback: (data: any) => void) {
    const redisAdapter = this.io.of('/').adapter

    redisAdapter.on('message', (channel: string, message: any) => {
      if (channel === streamName) {
        callback(message)
      }
    })
  }

  async readAllStream(streamName: string) {
    const streamData = await this.redisClient.xRange(streamName, '-', '+');
    return streamData.map((id, fields) => ({ id, message: fields }));
  }

  insertToRedisStream(streamName: string, data: any) {
    const message = {
      data: JSON.stringify(data)
    };
    this.redisClient.xAdd(streamName, '*', message)
  }
}

export default SocketIOServerWrapper
