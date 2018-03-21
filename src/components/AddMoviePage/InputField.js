import React, {Component} from "react";
import "../../styles/InputField.less";
import block from '../../helpers/BEM'

const b = block("InputField");

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiSelections: {
                genre: [],
                format: [],
                technology: []
            }
        }
    }

    handleSelect(e) {       // get data from check boxes
        const {multiSelections} = this.state;
        const name = e.target.name;
        const value = e.target.value;

        let arr = [];
        console.log(name, typeof name);
        if (!multiSelections[name].includes(value)) {
            console.log('Нема ще', value);
            arr = [...multiSelections[name], value];
        }
        else {
            console.log('Вже є', value);
            const ind = multiSelections[name].indexOf(value);
            const deselect = [...multiSelections[name]];
            deselect.splice(ind, 1);
            arr = [...deselect];
        }

        if (name === 'genre') {
            this.setState({
                multiSelections: {
                    genre: arr,
                    format: multiSelections['format'],
                    technology: multiSelections['technology']
                }
            })
        }
        else if (name === 'format') {
            this.setState({
                multiSelections: {
                    genre: multiSelections['genre'],
                    format: arr,
                    technology: multiSelections['technology']
                }
            })
        }
        else if (name === 'technology') {
            this.setState({
                multiSelections: {
                    genre: multiSelections['genre'],
                    format: multiSelections['format'],
                    technology: arr
                }
            })
        }
    }

    render() {
        const {arr, name} = this.props;
        console.log(arr, name);
        return arr.map((f, i) => {
            return (
                <div>
                    <input key={i} type="checkbox" name={name} value={f}
                           onChange={this.handleSelect.bind(this)}/>
                    <label>{f}</label>
                </div>
            );
        })

    }
}

export default InputField;