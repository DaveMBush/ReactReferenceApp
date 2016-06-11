import * as Dispatcher from '../dispatcher/appDispatcher.js'
import crudApi from '../api/crudApi.js'
import * as constants from '../constants/actionTypes.js'

const ActionTypes = constants.default;
const AppDispatcher = Dispatcher.default;
const CrudApi = crudApi.default;

class CrudActions{
    constructor(){

    }
    del(crud){
        CrudApi.del(crud);
        AppDispatcher.dispatch({
            actionType: ActionTypes.CRUD_DEL,
            data: crud
        });
    }
    add(crud){
        var newCrud = CrudApi.add(crud);
        AppDispatcher.dispatch({
            actionType: ActionTypes.CRUD_ADD,
            data: newCrud
        });
    }
    update(crud){
        var updateCrud = CrudApi.update(crud);
        AppDispatcher.dispatch({
            actionType: ActionTypes.CRUD_UPDATE,
            data: updateCrud
        });
    }
}

export default CrudActions;
