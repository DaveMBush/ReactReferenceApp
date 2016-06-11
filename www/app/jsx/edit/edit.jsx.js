import * as React from 'react';
import TextField from './components/textField.jsx.js';
import DropDownField from './components/dropdownField.jsx.js';
import SaveButton from './components/saveButton.jsx.js';
import CancelButton from './components/cancelButton.jsx.js';


class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <form className="form-horizontal" >
                <TextField label="Name" name="nameField" placeholder="name"
                           value={this.props.row.name} onChange={this.props.onNameChange} />
                <DropDownField label="Sex" name="sexField" value={this.props.row.sex}
                           onChange={this.props.onSexChange} options={this.props.row.sexChoices}
                           valueField={this.props.row.valueField} labelField={this.props.row.labelField}/>
                <TextField label="DOB" name="dobField" value={this.props.row.dob}
                           onChange={this.props.onDobChange} />
                <SaveButton editMode={this.props.editMode} onClick={this.props.saveClick}/>
                <CancelButton onClick={this.props.cancelClick} />
            </form>
        );
    }
}
export default Edit