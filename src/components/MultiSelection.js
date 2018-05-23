import React, {Component} from "react";
import "../styles/MultiSelection.less";
import Select from 'react-select';

class MultiSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }

    handleSelectChange(value) {
        const val = value.split(',');
        this.setState({value: val});
    }

    componentDidUpdate(prevProps, prevState) {
        const {value} = this.state;
        const {name} = this.props;
        if (prevState !== this.state) {
            this.props.callback(name, value);
        }
    }

    render() {
        const {value} = this.state;
        const {options, name} = this.props;
        let opt = [];
        for (let i = 0; i < options.length; i++) {
            opt.push({
                label: options[i],
                value: options[i]
            })
        }

        return (<div className="section">
                <Select
                    closeOnSelect={false}
                    multi
                    onChange={this.handleSelectChange.bind(this)}
                    options={opt}
                    placeholder={"Select " + name + '(s)'}
                    simpleValue
                    value={value}
                />
            </div>
        );
    }
}

export default MultiSelection;