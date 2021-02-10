import { io } from 'socket.io-client';

const ioClient = io('ws://localhost:8080');

ioClient.on('connect', () => {
    console.log('Consumer connected to websocket server');
});
type Promisify<T> = Promise<{[K in keyof T]: Promise<T[K]>}>;

function Consumer<T>(name: string): Promisify<T> {
    if (!name) {
        throw new Error('Name is required');
    }

    /* Phase 1: Resolve object name and make sure it exists */
    ioClient.emit('resolve', name);
    ioClient.on('notResolved', () => {
        throw new Error(`Object ${name} not found`);
    });

    /* Phase 2: Create a new Proxy to transform properties and methods to async */
    const proxy = new Proxy(
        {},
        {
            get: async function (target, prop, receiver) {
              if (prop !== 'then') {
                return new Promise((resolve) => {
                  ioClient.emit('resolveProp', name, prop, (res: any) => {
                    resolve(res)
                  });
                  ioClient.once('consumerPropResolved', (res: any) => resolve(res));
                });
            }
        }
      }
    );

    return new Promise((resolve, reject) => {
        /* Remote obj not found */
        ioClient.on('notResolved', () => {
            reject(`Object name ${name} not found`);
        });

        ioClient.on('consumerPropResolved', (res: any) => console.log(res));

        // @ts-ignore
        resolve(proxy);
    });
}

export default Consumer;
