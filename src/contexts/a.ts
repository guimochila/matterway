import { Provider } from '../state/ContextProvider';

// Context.A

export interface IRemoteObj {
    name: string;
    age: number;
    filter: RegExp;
    add: (value: number) => number;
    returnFn: () => (value: number) => number;
}

const myObj: IRemoteObj = {
    name: 'A',
    age: 1,
    filter: /\d+/,
    add: (value: number) => {
        return 1 + value;
    },
    returnFn: () => {
        return function (value: number) {
            return 1 + value;
        };
    },
};

Provider<IRemoteObj>('remoteObj', myObj);
