import * as Dispatcher from '../dispatcher/appDispatcher.js'
import * as constants from '../constants/actionTypes.js'
import {EventEmitter} from 'events'
import * as SuperAgent from 'superagent'
const CHANGE = 'change';
const AppDispatcher = Dispatcher.default;
const ActionTypes = constants.default;
const superAgent = SuperAgent.default;

class CrudStore extends EventEmitter{
    constructor(){
        super();
        var store = this;
        AppDispatcher.register((action) => {
            switch(action.actionType){
                case ActionTypes.CRUD_ADD:
                    store.add(action.data);
                    break;
                case ActionTypes.CRUD_DEL:
                    store.del(action.data);
                    break;
                case ActionTypes.CRUD_UPDATE:
                    store.save(action.data);
                    break;
                case ActionTypes.CRUD_LIST:
                    store.list();
                    break;
                case ActionTypes.CRUD_GET:
                    store.get(action.id);
                    break;
            }
        });
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
    add(data){
        data.id = ''; // make sure it is empty
        this.save(data);
    }
    save(data){
        superAgent.post('/api/contact/'+ data.id)
            .send(data)
            .end((error,response)=>{
                /* istanbul ignore else */
                if(!error){
                    this.emitChange(ActionTypes.CRUD_UPDATE,data);
                }
            });
    }
    get(id){
        superAgent.get('/api/contact/'+id).end((error,response)=>{
            /* istanbul ignore else */
            if(!error){
                var item = response.body;
                item.id = item._id;
                item.dob = new Date(item.dob);
                this.emitChange(ActionTypes.CRUD_GET,item);
            }
        });
    }
    list(){
        superAgent.get('/api/contact').end((error,response) => {
            /* istanbul ignore else */
            if(!error){
                response.body.forEach((item) => {
                    item.id = item._id;
                    item.dob = new Date(item.dob);
                });
                this.emitChange(ActionTypes.CRUD_LIST,response);
            }
        });
    }
    del(id){
        superAgent.del('/api/contact/'+id).end((error,response)=>{
            /* istanbul ignore else */
            if(!error){
                this.list();
            };
        });
    }
}

const store = new CrudStore();
export default store;