import Provider from '../mylib/Provider';

// Context.A

export interface IRemoteObj {
    name: string;
    age: number;
    filter: RegExp;
    add: (value: number) => number;
    returnFn: () => (value: number) => number;
}

const localVariable = 123;

const myObj: IRemoteObj = {
    name: 'A',
    age: 1,
    filter: /\d+/,
    add: (value: number) => {
        return localVariable + value;
    },
    returnFn: () => {
        return function (value: number) {
            return localVariable + value;
        };
    },
};

Provider<IRemoteObj>('remoteObj', myObj);
