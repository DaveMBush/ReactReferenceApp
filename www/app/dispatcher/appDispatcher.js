
import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher
{
    constructor(){
        super()
    }
}

const dispatcher = new AppDispatcher();

export default dispatcher;