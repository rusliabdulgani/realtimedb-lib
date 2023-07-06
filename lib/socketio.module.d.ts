import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Server, Socket } from 'socket.io';
declare class FHISocketIO {
    server: any;
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined;
    error: any;
    constructor(server: any);
    listenConnection(io: Server): Promise<Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined>;
    handleConnection(): Promise<void>;
}
export { FHISocketIO };
//# sourceMappingURL=socketio.module.d.ts.map