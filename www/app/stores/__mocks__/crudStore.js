//import * as Dispatcher from '../dispatcher/appDispatcher.js'
//import * as constants from '../constants/actionTypes.js'
import {EventEmitter} from 'events'
//import * as SuperAgent from 'superagent'
const CHANGE = 'change';
//const AppDispatcher = Dispatcher.default;
//const ActionTypes = constants.default;

class CrudStore extends EventEmitter{
    constructor(){
        super();
    }
    addChangeListener(callback){
        this.on(CHANGE,callback);
    }
    removeChangeListener(callback){
        this.removeListener(CHANGE,callback);
    }
    emitChange(type,newData){
        this.emit(CHANGE,type,newData);
    }
    list(){
        //SuperAgent.default.get('/api/contact').end((error,response) => {
        //    if(!error){
        //        response.body.forEach((item) => {
        //            item.id = item._id;
        //            item.dob = new Date(item.dob);
        //        });
        //        this.emitChange(ActionTypes.CRUD_LIST,response);
        //    }
        //});
    }
}

const store = new CrudStore();

//AppDispatcher.register((action) => {
//    switch(action.actionType){
//        case ActionTypes.CRUD_ADD:
//            store.emitChange(action.data);
//            break;
//        case ActionTypes.CRUD_DEL:
//            store.emitChange(action.data);
//            break;
//        case ActionTypes.CRUD_UPDATE:
//            store.emitChange(action.data);
//            break;
//        case ActionTypes.CRUD_LIST:
//            store.list();
//    }
//});

export default store;