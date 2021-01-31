import { Consumer } from '../state/ContextProvider';
import { IRemoteObj } from '../contexts/a';

// Context.B

async function init() {
    const remoteObj = await Consumer<IRemoteObj>('remoteObj');
    console.log(await remoteObj.name);
    console.log(await remoteObj.age);
    console.log('123'.match(await remoteObj.filter));
    console.log(await remoteObj.add(5));
    const remoteFunction = await remoteObj.returnFn();
    console.log(await remoteFunction(36));
}

init();
