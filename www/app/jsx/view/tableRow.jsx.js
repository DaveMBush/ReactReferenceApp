import * as React from 'react';


class TableRow extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onEdit(){
       this.props.onEdit(this.props.item.id);
    }
    onDelete(){
        this.props.onDelete(this.props.item.id);
    }
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.sex}</td>
                <td>{this.props.item.dob.toLocaleDateString()}</td>
                <td>
                    <button className="btn btn-default pull-right" onClick={this.onEdit}><span className="fa fa-pencil"> Edit</span></button>
                    <button className="btn btn-default pull-right" onClick={this.onDelete}><span className="fa fa-trash-o"> Delete</span></button>
                </td>
            </tr>
        );
    }
}
TableRow.propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    item: React.PropTypes.object.isRequired
};
export default TableRow