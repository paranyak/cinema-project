import React, {Component} from "react";
import "../styles/CastInputs.less";
import block from '../helpers/BEM'
import slugify from 'slugify';

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
            {console.log("IN MAP: ca", chosenActors[j])}
            return <div key={j}>
                <input name='name' className={b('input')} placeholder={'Enter actor name'} type="text" value={ac}
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)}
                       list="actors"/>
                <datalist id="actors">
                    {suggestedActors[j].map((actor, i) => <option key={i} value={actor.name.split("_").join(" ")}/>)}
                </datalist>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeActor.bind(this, j)}/>
            </div>
        })
    }

    async onListChange(i, e) {
        if (e.target.value) {
            const response = await fetch(`http://localhost:3000/actors/autocomplete/${e.target.value}`);// 'posts' to get work the url
            //об не працювало на пробіли
            if (!response.ok) {
                console.log("ERROR IN Choosing ACTOR");
            } else {
                let suggestedActors = await (response.json());
                console.log("RESPONSE", suggestedActors, i);
                let newSuggested = this.state.suggestedActors;
                const suggestedArr = [
                    ...newSuggested.slice(0, i),
                    suggestedActors,
                    ...newSuggested.slice(i+1)
                ];
                this.setState({suggestedActors: suggestedArr});
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
        console.log("Choosen:", this.state.chosenActors);
        callback(name, arr);
    }

    addActor(e) {
        e.preventDefault();
        const {chosenActors} = this.state;
        this.setState({
            chosenActors: [...chosenActors, ""]
        });
        let {suggestedActors} = this.state;
        this.setState({
            suggestedActors: [...suggestedActors, []]
        });
    }

    removeActor(i) {
        const {chosenActors} = this.state;
        const arr = [
            ...chosenActors.slice(0, i),
            ...chosenActors.slice(i + 1)
        ];
        this.setState({chosenActors: arr});

        let {suggestedActors} = this.state;
        const suggestedArr = [
            ...suggestedActors.slice(0, i),
            ...suggestedActors.slice(i + 1)
        ];

        this.setState({suggestedActors: suggestedArr});

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
