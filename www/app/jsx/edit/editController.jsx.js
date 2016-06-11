import * as React from 'react';
import Edit from './edit.jsx.js'
import * as Dispatcher from '../../dispatcher/appDispatcher.js'
import * as actionTypes from '../../constants/actionTypes.js'
import * as crudStore from '../../stores/crudStore.js'

const ActionTypes = actionTypes.default;
const AppDispatch = Dispatcher.default;
const CrudStore = crudStore.default;


class EditController extends React.Component{
    constructor(props) {
        super(props);
        if(!props.params.id){
            props.params.id = -1;
        }
        this.onChange = this.onChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDobChange = this.onDobChange.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.editMode = props.params.id === -1 ? 'add' : 'edit';
        this.state = {data: [],id: props.params.id,name:'',sex:'M',dob: (new Date()).toLocaleDateString(), sexChoices:[{value: 'M'},{value:'F'}],valueField: 'value',labelField: 'value'};
    }
    onChange(type,item){
        if(type === ActionTypes.CRUD_GET){
            this.setState({name: item.name, sex: item.sex, dob: (new Date(item.dob)).toLocaleDateString() });
        }
        if(type === ActionTypes.CRUD_UPDATE){
            this.context.router.push('');
        }
    }
    onSaveClick(){
        if(this.editMode === 'edit') {
            AppDispatch.dispatch({actionType: ActionTypes.CRUD_UPDATE, data: this.state});
            return;
        }
        AppDispatch.dispatch({actionType: ActionTypes.CRUD_ADD, data: this.state});
    }
    onCancelClick(){
        this.context.router.push('');
    }
    onNameChange(event){
        this.setState({name: event.target.value});
    }
    onSexChange(event){
        this.setState({sex: event.target.value});
    }
    onDobChange(event){
        this.setState({dob: event.target.value});
    }

    //noinspection JSUnusedGlobalSymbols
    componentWillMount(){
        CrudStore.addChangeListener(this.onChange);
        if(this.editMode === 'edit'){
            AppDispatch.dispatch({actionType:ActionTypes.CRUD_GET,id: this.state.id});
        }
    }
    //noinspection JSUnusedGlobalSymbols
    componentWillUnmount(){
        CrudStore.removeChangeListener(this.onChange);
    }
    render() {
        return (
            <Edit row={this.state}
                  onNameChange={this.onNameChange}
                  onSexChange={this.onSexChange}
                  onDobChange={this.onDobChange}
                  saveClick={this.onSaveClick}
                  cancelClick={this.onCancelClick}
                  editMode={this.editMode}
            />
        );
    }
}

EditController.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default EditController;