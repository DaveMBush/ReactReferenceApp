import * as React from 'react';

class TextField extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div class="form-group">
                <label htmlFor={this.props.name} className="col-lg-3 control-label">{this.props.label}</label>
                <div className="col-lg-9">
                    <input type='text' id={this.props.name} value={this.props.value} placeholder={this.props.placeholder} className="form-control" onChange={this.props.onChange}/>
                </div>
            </div>
        );
    }
}

export default TextField
