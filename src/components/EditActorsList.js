import React, {Component} from "react";
import "../styles/EditActorsList.less";
import block from '../helpers/BEM'
import {getActorById} from "../reducers";
import {connect} from "react-redux";
import {fetchActors} from "../actions/fetch";

const b = block("EditActorsList");

class EditActorsList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            suggestedActors: [],
            cast: props.cast
        }
    }


    createList() {
        const {suggestedActors} = this.state;
        const {film} = this.props;
        return this.state.cast.map((ac, j) => {
            return <div key={j}>
                <input name='name' className={b('input')} placeholder={'Enter actor name'} type="text" value={ac.id}
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)}
                       list="actors"/>
                <datalist id="actors">
                    {suggestedActors.map((actor, i) => <option key={i} value={actor.id}/>)}
                </datalist>
                <input type='text' value={ac.movies[film.id][1]} className={b('input')}
                       onChange={this.onRoleChange.bind(this, j)}
                       placeholder="Enter actor's role" name='role'/>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeActorAndRole.bind(this, j)}/>
            </div>
        })
    }

    async onListChange(i, e) {
        const response = await fetch(`http://localhost:3000/actors?id_like=${e.target.value}`);// 'posts' to get work the url

        if (!response.ok) {
            console.log("ERROR IN Choosing ACTOR");
            return null;
        } else {
            let suggestedActors = await (response.json());
            if (suggestedActors !== []) {
                this.setState({suggestedActors});
                console.log('sug actors', this.state.suggestedActors);
            }
        }
    }

    onOptionClick(i, e) {
        const {callback} = this.props;
        const arr = [
            ...this.state.cast.slice(0, i),
            Object.assign({}, this.state.cast[i], {id: e.target.value}),
            ...this.state.cast.slice(i + 1)
        ];
        this.setState({cast: arr});
        callback('cast', arr);
    }

    onRoleChange(i, e) {
        const {callback, film} = this.props;
        const key = film.id;
        const {cast} = this.state;
        const arr = [
            ...cast.slice(0, i),
            Object.assign({}, cast[i], {movies:
                Object.assign({}, cast.movies, {[key]: [film.name, e.target.value]})}
            ),
            ...cast.slice(i + 1)
        ];
        this.setState({cast: arr});
        callback('cast', arr);
    }

    addActorAndRole(e) {
        e.preventDefault();
        const {callback, film} = this.props;
        this.setState(prevState => {
            const arr = [...prevState.cast, {
                id: '',
                movies: {
                    [film.id]: [film.name, '']
                }
            }];
            callback('cast', arr);
            return {cast: arr};
        });
    }

    removeActorAndRole(i) {
        const {callback} = this.props;
        const {cast} = this.state;
        const arr = [
            ...cast.slice(0, i),
            ...cast.slice(i + 1)
        ];
        this.setState({
            cast: arr
        });
        callback('cast', arr);
    }

    render() {
        const {cast} = this.props;
        const {film} = this.props;
        for (let c = 0; c < cast.length; c++) {
            if (cast[c].id === undefined) {
                this.props.fetchActorById(film.cast[c]);
                return null;
            }
            else if (cast[c].error || cast[c].movies[film.id] === undefined) {
                return null;
            }
        }
        return <div className={b()}>
            <button className={b('button')} onClick={this.addActorAndRole.bind(this)}>+</button>
            {this.createList()}
        </div>
    }


}

export default connect((state, props) => {
        const actors = props.film.cast.map(actor => getActorById(state, actor));
        console.log('actors', actors);
        return {cast: actors};
    }, (dispatch) => ({
        fetchActorById: (id) => dispatch(fetchActors(id))
    })
)(EditActorsList);