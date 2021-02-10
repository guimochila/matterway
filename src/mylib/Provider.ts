import { io } from 'socket.io-client';

const ioClient = io('ws://localhost:8080');

ioClient.on('connect', () => {
    console.log('Provider connected to websocket server');
});

function Provider<T extends {[k in keyof T]: any}>(objName: string, remoteObj: T) {
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
    ioClient.on('providerResolveProp', (prop: string) => {
        // @ts-ignore
        if (!remoteObj.hasOwnProperty(prop)) {
            ioClient.emit('resolvePropFailed');
            return;
        }

        let result;
        // @ts-ignore
        const propType = typeof remoteObj[prop];

        switch(propType) {
          case 'string':
          case 'number': 
          case 'boolean':
            // @ts-ignore
            result = remoteObj[prop];
            break;
        }

        ioClient.emit('providerPropResolved', result)
      });
}

export default Provider;
