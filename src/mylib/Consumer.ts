import { io } from 'socket.io-client';

const ioClient = io('ws://localhost:8080');

ioClient.on('connect', () => {
    console.log('Consumer connected to websocket server');
});

function Consumer<T>(name: string): Promise<T> {
    if (!name) {
        throw new Error('Name is required');
    }

    let targetId;

    /* Phase: 1 Resolve object name and make sure it exists */
    ioClient.emit('resolve', name);
    ioClient.on('notResolved', () => {
        throw new Error(`Object ${name} not found`);
    });

    ioClient.on('objNameId', (id: string) => {
        targetId = id;
    });

    console.log(targetId);

    const proxy = new Proxy(
        {},
        {
            get: async function (target, prop) {
                if (prop !== 'then') {
                    return new Promise((resolve) => {
                        ioClient.emit('resolveProp', name, prop);
                        resolve('inside Consumer');
                    });
                }
            },
        }
    );

    return new Promise((resolve, reject) => {
        /* Remote obj not found */
        ioClient.on('notResolved', () => {
            reject(`Object name ${name} not found`);
        });

        ioClient.on('consumerPropResolved', (res: any) => console.log(res));

        resolve(proxy);
    });
}

export default Consumer;
