console.log('Loading contexts');

/*  Context A is the provider 
    It creates the object in memory and
    send to our node.js server
*/
import './contexts/a';

/*  Context B is the consumer
    It load the remote object for
    consumption
*/
import './contexts/b';

