import { io } from 'socket.io-client';

const ioClient = io('ws://localhost:8080');

ioClient.on('connect', () => {
    console.log('Provider connected to websocket server');
});

function Provider<T>(objName: string, remoteObj: T) {
    if (!objName || !remoteObj) {
        throw new Error('Parameter objName and remoteObj are required.');
    }

    if (typeof remoteObj !== 'object') {
        throw new Error('Remote object must be an object');
    }

    const notify = (res: any) => {
        console.log(res);
    };

    ioClient.emit('notify', objName, notify);

    /* Resolve Props */
    // ioClient.on('providerResolveProp', (prop: string) => {
    //     console.log('Inside provierResolver');
    //     // @ts-ignore
    //     if (!remoteObj.hasOwnProperty(prop)) {
    //         ioClient.emit('resolvePropFailed');
    //     }

    //     // @ts-ignore
    //     const propType = Object.prototype.toString.call(remoteObj[prop]);
    //     let result;
    //     if (propType.includes('String')) {
    //         result = remoteObj[prop];
    //     }

    //     ioClient.emit('resolvedProp', result);
    // });
}

export default Provider;
