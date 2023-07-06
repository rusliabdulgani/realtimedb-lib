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
exports.FHISocketIO = void 0;
const socket_io_1 = require("socket.io");
class FHISocketIO {
    constructor(server) {
        this.server = server;
        this.io = new socket_io_1.Server(server);
        this.handleConnection.bind(this);
        this.listenConnection.bind(this);
    }
    listenConnection(io) {
        return new Promise((resolve, reject) => {
            io.on('connection', (socket) => {
                console.log('user connected!');
                resolve(socket);
            });
            // Handle potential errors or timeouts
            io.on('error', (error) => {
                reject(error);
            });
        });
    }
    handleConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const socket = yield this.listenConnection(this.io);
                this.socket = socket;
            }
            catch (e) {
                this.error = e;
            }
        });
    }
}
exports.FHISocketIO = FHISocketIO;
//# sourceMappingURL=socketio.module.js.map