import { WrapperOptions } from '@interfaces';
declare class SocketIOServerWrapper {
    private io;
    private redisClient;
    constructor(server: any, options: WrapperOptions);
    initRedisStreamAdapter(redisServer: string): Promise<void>;
    listen(event: any, handler: (msg: string) => void): void;
    onStreamChange(streamName: string, callback: (data: any) => void): void;
    insertToRedisStream(streamName: string, data: any): void;
}
export default SocketIOServerWrapper;
//# sourceMappingURL=socketio.module.d.ts.map