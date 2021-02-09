import { Socket } from 'socket.io';
import { Server } from 'socket.io';

/* 
    Socket.io - initializing server
*/
const io = new Server(8080, {
    cors: {
        origin: '*',
    },
});
console.log(`Server started at port 8080`);

/* 
    Global identifier for remote Objects
*/
interface Global {
    [k: string]: string;
}
const global: Global = {};

io.on('connection', (socket: Socket) => {
    /* 
        When notified that there is a new object
        It add to the global identifier a new 
        property with objName and socket ID
    */
    socket.on('notify', (name: string) => {
        if (!global[name]) {
            global[name] = socket.id;
        }
    });

    socket.on('resolve', (name: string) => {
        if (!global.hasOwnProperty(name)) {
            socket.emit('notResolved');
        }
        socket.emit('objNameId', global[name]);
    });

    // socket.on('resolveProp', (name: string, prop: any) => {
    //     socket.to(global[name]).emit('providerResolveProp', prop);
    // });

    // socket.on('resolvedProp', (res: any) => {
    //     socket.emit('consumerPropResolved', res);
    // });
});
