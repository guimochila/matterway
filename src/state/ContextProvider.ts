const endpoint = 'http://localhost:8080/remote';

function serializeObj(unserializedObj: any) {
    if (!unserializedObj) return;

    let newObj: any = {};

    for (const [key, value] of Object.entries(unserializedObj)) {
        if (typeof value === 'function') {
            newObj[key] = `__FUNCTION__= ${value.toString().trim()}`;
            continue;
        }

        if (value instanceof RegExp) {
            newObj[key] = `__REGEX__= ${value.toString()}`;
            continue;
        }

        newObj[key] = value;
    }

    return newObj;
}

function deserializeObj(obj: any) {
    if (!obj) return;

    let newObj: any = {};

    for (const [key, value] of Object.entries(obj)) {
        // @ts-ignore
        if (typeof value === 'string' && value.startsWith('__FUNCTION__= ')) {
            // @ts-ignore
            newObj[key] = eval(`(${value.replace('__FUNCTION__= ', '')})`);
            continue;
        }

        if (typeof value === 'string' && value.startsWith('__REGEX__= ')) {
            newObj[key] = eval(`(${value.replace('__REGEX__= ', '')})`);
            continue;
        }

        newObj[key] = value;
    }

    return newObj;
}

export async function Provider<T>(objName: string, remoteObj: T) {
    if (!objName) {
        throw new Error('objName (Object name) is required');
    }

    if (!remoteObj) {
        throw new Error('remoteObj (Object) argument is required');
    }

    await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            keyName: [objName],
            data: serializeObj(remoteObj),
        }),
    });

    return;
}

export async function Consumer<T>(objName: string): Promise<T> {
    if (!objName) {
        throw new Error(`Object name ${objName} not found.`);
    }

    const urlParams = new URLSearchParams({ obj: objName });
    const response = await fetch(`${endpoint}?${urlParams}`);
    const data = await response.json();

    return new Promise((resolve, reject) => {
        const remoteObj = deserializeObj(data);

        resolve(remoteObj);
    });
}
