import * as React from 'react';

class SaveButton extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        if(this.props.editMode === 'add'){
            return (
                <button type="button" onClick={this.props.onClick} className="btn btn-primary pull-right">
                    <span className="fa fa-plus">&nbsp;</span> Add</button>);
        }
        return (<button type="button" onClick={this.props.onClick} className="btn btn-primary pull-right">
            <span className="fa fa-floppy-o">&nbsp;</span> Save</button>);
    }
}

export default SaveButton
