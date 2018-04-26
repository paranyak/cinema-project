import React, {Component} from "react";
import "../styles/NominationsList.less";
import block from '../helpers/BEM'

const b = block("NominationsList");

class NominationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nominations: props.nominations
        }
    }

    createNomiList() {
        const {nominations} = this.state;
        return nominations.map((n, j) => {
            return <div key={j}>
                <input required type='text' value={n} className={b('input')} onChange={this.onInputChange.bind(this, j)} placeholder="Enter actor's nomination"/>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeInput.bind(this, j)}/>
            </div>
        })
    }

    onInputChange(i, e) {
        const {value} = e.target;
        const {nominations} = this.state;
        const arr = [
            ...nominations.slice(0, i),
            value,
            ...nominations.slice(i + 1)
        ];
        this.setState({nominations: arr});
        this.props.callback('nominations', arr)
    }

    removeInput(i) {
        const {nominations} = this.state;
        const arr = [
            ...nominations.slice(0, i),
            ...nominations.slice(i + 1)
        ];
        this.setState({nominations: arr});
        this.props.callback('nominations', arr)
    }

    addInput(e) {
        e.preventDefault();
        const {nominations} = this.state;
        this.setState({
            nominations: [...nominations, '']
        })
    }

    render() {
        return <div className={b()}>
            <button className={b('button')} onClick={this.addInput.bind(this)}>+</button>
            {this.createNomiList()}
        </div>
    }
}

export default NominationsList;