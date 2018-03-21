import React, {Component} from "react";
import "../../styles/InputField.less";
import block from '../../helpers/BEM'

const b = block("InputField");

class InputField extends Component {
    render() {
        const {array, name, action} = this.props;
        return array.map((f, i) => {
            return (
                <div>
                    <input key={i} type="checkbox" name={name} value={f}
                           onChange={action}/>
                    <label>{f}</label>
                </div>
            );
        })

    }
}

export default InputField;