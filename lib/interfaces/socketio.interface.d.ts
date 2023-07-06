/// <reference types="node" />
interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}
interface ClientToServerEvents {
    hello: () => void;
}
interface InterServerEvents {
    ping: () => void;
}
interface SocketData {
    name: string;
    age: number;
}
export { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData };
//# sourceMappingURL=socketio.interface.d.ts.map