import * as React from 'react';

class TableHead extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <thead>
            <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>DOB</th>
            </tr>
            </thead>
        );
    }
}

export default TableHead
