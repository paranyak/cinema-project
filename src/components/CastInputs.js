import React, {Component} from "react";
import "../styles/CastInputs.less";
import block from '../helpers/BEM'

const b = block("CastInputs");

class CastInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedActors: [],
            chosenActors: []
        }
    }

    createCastList() {
        const {suggestedActors, chosenActors} = this.state;
        return chosenActors.map((ac, j) => {
            return <div key={j}>
                <input name='name' className={b('input')} placeholder={'Enter actor name'} type="text" value={ac}
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)}
                       list="actors"/>
                <datalist id="actors">
                    {suggestedActors.map((actor, i) => <option key={i} value={actor.id}/>)}
                </datalist>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeActor.bind(this, j)}/>
            </div>
        })
    }

    async onListChange(i, e) {
        const response = await fetch(`http://localhost:3000/actors?id_like=${e.target.value}`);// 'posts' to get work the url

        if (!response.ok) {
            console.log("ERROR IN Choosing ACTOR");
        } else {
            let suggestedActors = await (response.json());
            if (suggestedActors !== []) {
                this.setState({suggestedActors});
                console.log('sug actors', this.state.suggestedActors);
            }
        }
    }

    onOptionClick(i, e) {
        const {name, callback} = this.props;
        const arr = [
            ...this.state.chosenActors.slice(0, i),
            e.target.value,
            ...this.state.chosenActors.slice(i + 1)
        ];
        this.setState({chosenActors: arr});
        callback(name, arr);
    }

    addActor(e) {
        e.preventDefault();
        const {chosenActors} = this.state;
        this.setState({
            chosenActors: [...chosenActors, '']
        })
    }

    removeActor(i) {
        const {chosenActors} = this.state;
        const arr = [
            ...chosenActors.slice(0, i),
            ...chosenActors.slice(i + 1)
        ];
        this.setState({chosenActors: arr});
        this.props.callback('cast', arr)
    }

    render() {
        return <div className={b()}>
            <button className={b('button')} onClick={this.addActor.bind(this)}>+</button>
            {this.createCastList()}
        </div>
    }
}

export default CastInputs;