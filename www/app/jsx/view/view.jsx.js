import * as React from 'react';
import TableHead from './tableHead.jsx.js'
import TableBody from './tableBody.jsx.js'


export default class View extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div>
                <table className="table table-hover">
                    <TableHead />
                    <TableBody data={this.props.data} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
                </table>
                <button className="btn btn-primary pull-right" onClick={this.props.onAdd}>
                    <span className="fa fa-plus">&nbsp;</span> Add</button>
            </div>
        );
    }
}
View.propTypes = {
    onAdd: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired
};
