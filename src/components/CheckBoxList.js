import React, {Component} from "react";
import "../styles/CheckBoxList.less";
import block from '../helpers/BEM'

const b = block("CheckBoxList");

class CheckBoxList extends Component {
    render() {
        const {array, name, action} = this.props;
        return <div className={b()}>
            <h3 className={b('title')}>{name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()}</h3>

            {array.map((f, i) => (
                <label key={i} className={b('item')}>
                    <input type="checkbox" name={name} value={f}
                           onChange={action}/>
                    {f}
                </label>
            ))}
        </div>
    }
}

export default CheckBoxList;