"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const redis_1 = require("redis");
const redis_streams_adapter_1 = require("@socket.io/redis-streams-adapter");
class SocketIOServerWrapper {
    constructor(server, options) {
        this.io = new socket_io_1.Server(server, {});
        this.listen = this.listen.bind(this);
        if (options.adapter && options.adapter.redisServer) {
            this.initRedisStreamAdapter(options.adapter.redisServer);
        }
    }
    initRedisStreamAdapter(redisServer) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = (0, redis_1.createClient)({ url: redisServer });
            this.redisClient = redisClient;
            yield redisClient.connect();
            const adapter = (0, redis_streams_adapter_1.createAdapter)(redisClient);
            this.io.adapter(adapter);
        });
    }
    listen(event, handler) {
        this.io.on('connection', (socket) => {
            socket.on(event, (data) => __awaiter(this, void 0, void 0, function* () {
                const response = yield handler(data);
                this.insertToRedisStream(event, response);
                socket.emit(event, response);
            }));
        });
    }
    onStreamChange(streamName, callback) {
        const redisAdapter = this.io.of('/').adapter;
        redisAdapter.on('message', (channel, message) => {
            if (channel === streamName) {
                callback(message);
            }
        });
    }
    insertToRedisStream(streamName, data) {
        const message = {
            data: JSON.stringify(data)
        };
        this.redisClient.xAdd(streamName, '*', message);
    }
}
exports.default = SocketIOServerWrapper;
//# sourceMappingURL=socketio.module.js.map