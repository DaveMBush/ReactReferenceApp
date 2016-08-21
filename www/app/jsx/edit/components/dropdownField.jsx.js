import * as React from 'react';

class DropDownField extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        var self = this;
        var options = self.props.options.map(function(option) {
            return (
                <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                    {option[self.props.labelField]}
                </option>
            )
        });
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} className="col-lg-3 control-label">{this.props.label}</label>
                <div className="col-lg-9">
                    <select id={this.props.name} value={this.props.value} className="form-control" onChange={this.props.onChange}>
                        {options}
                    </select>
                </div>
            </div>
        );
    }
}

export default DropDownField
