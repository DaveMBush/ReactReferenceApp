import * as React from 'react';

import TableRow from './tableRow.jsx.js';

class TableBody extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <tbody>
            {
                this.props.data.map(function(item){
                    return(
                        // no longer need key attribute but test throws warning without it
                        <TableRow  key={item.id} item={item} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
                    )
                },this)
            }
            </tbody>

        );
    }
}
TableBody.propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired
};
export default TableBody