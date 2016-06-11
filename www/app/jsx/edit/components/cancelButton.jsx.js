import * as React from 'react';

class CancelButton extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <button type="button" onClick={this.props.onClick} className="btn btn-default pull-right">
                <span className="fa fa-ban">&nbsp;</span> Cancel</button>);
    }
}

export default CancelButton
