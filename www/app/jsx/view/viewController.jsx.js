import * as React from 'react';
import View from './view.jsx.js'
import * as Dispatcher from '../../dispatcher/appDispatcher.js'
import * as actionTypes from '../../constants/actionTypes.js'
import * as crudStore from '../../stores/crudStore.js'

const ActionTypes = actionTypes.default;
const AppDispatch = Dispatcher.default;
const CrudStore = crudStore.default;

class ViewController extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }
    componentWillMount(){
        CrudStore.addChangeListener(this.onChange);
        AppDispatch.dispatch({actionType:ActionTypes.CRUD_LIST});
    }
    componentWillUnmount(){
        CrudStore.removeChangeListener(this.onChange);
    }
    onChange(type,data){
        if(type === ActionTypes.CRUD_LIST){
            this.setState({data: data.body});
        }
    }
    onAdd(){
        this.context.router.push('/Edit');
    }
    onDelete(id){
        AppDispatch.dispatch({actionType:ActionTypes.CRUD_DEL,data:id});
    };
    onEdit(id){
        this.context.router.push('/Edit/' + id);
    };
    render() {
        return (
            <View onAdd={this.onAdd} data={this.state.data} onEdit={this.onEdit} onDelete={this.onDelete} />
        );
    }
}

ViewController.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ViewController;

