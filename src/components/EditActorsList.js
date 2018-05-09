import React, {Component} from "react";
import "../styles/EditActorsList.less";
import block from '../helpers/BEM'

const b = block("EditActorsList");

class EditActorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedActors: [],
            cast: props.actors
        }
    }

    createList() {
        const {suggestedActors, cast} = this.state;
        return cast.map((ac, j) => {
            return <div key={j}>
                <input name='name' className={b('input')} placeholder={'Enter actor name'} type="text"
                       value={ac.name} list="actors"
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)}/>
                <datalist id="actors">
                    {suggestedActors.map((actor, i) => <option key={i} value={actor.name}/>)}
                </datalist>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeActorAndRole.bind(this, j)}/>
            </div>
        })
    }

    async onListChange(i, e) {
        const response = await fetch(`http://localhost:3000/actors/autocomplete/${e.target.value}`);// 'posts' to get work the url
        if (!response.ok) {
            console.log("ERROR IN Choosing ACTOR");
            return null;
        } else {
            let suggestedActors = await (response.json());
            if (suggestedActors.length !== 0) {
                this.setState({suggestedActors});
                console.log('sug actors', this.state.suggestedActors);
            }
        }
    }

    onOptionClick(i, e) {
        const {callback} = this.props;
        const {value} = e.target;
        const filtered = this.state.suggestedActors.filter(f => f.name === value);// || f.name.includes(value));
        let _id = '';
        let movies = [];
        if (filtered.length === 1) {
            _id = filtered[0]._id;
            movies = filtered[0].movies;
        }
        const arr = [
            ...this.state.cast.slice(0, i),
            Object.assign({}, this.state.cast[i], {name: value, _id, movies}),
            ...this.state.cast.slice(i + 1)
        ];
        this.setState({cast: arr});
        callback('cast', arr);
    }

    addActorAndRole(e) {
        e.preventDefault();
        const {callback} = this.props;
        const arr = [...this.state.cast, {name: '', _id: '', movies: []}];
        this.setState({cast: arr});
        callback('cast', arr);
    }

    removeActorAndRole(i) {
        const {callback} = this.props;
        const {cast} = this.state;
        const arr = [
            ...cast.slice(0, i),
            ...cast.slice(i + 1)
        ];
        this.setState({cast: arr});
        callback('cast', arr);
    }

    render() {
        return <div className={b()}>
            <button className={b('button')} onClick={this.addActorAndRole.bind(this)}>+</button>
            {this.createList()}
        </div>
    }
}

export default EditActorsList;