import React, {Component} from "react";
import block from "../helpers/BEM";
import "../styles/EditList.less";

const b = block("EditList");

class EditMoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedMovies: [],
            movieList: props.movies
        }
    }

    createList() {
        const {suggestedMovies, movieList} = this.state;
        return movieList.map((m, j) => {
            return <div key={j}>
                <input name='name' className={b('input')} placeholder={'Enter movie title'} type="text"
                       value={m.name} list="movies"
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)}/>
                <datalist id="movies">
                    {suggestedMovies.map((movie, i) => <option key={i} value={movie.name}/>)}
                </datalist>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeMovie.bind(this, j)}/>
            </div>
        })
    }

    async onListChange(i, e) {
        const response = await fetch(`http://localhost:3000/movies/autocomplete/${e.target.value}`);// 'posts' to get work the url
        if (!response.ok) {
            console.log("ERROR IN Choosing Movie");
            return null;
        } else {
            let suggestedMovies = await (response.json());
            if (suggestedMovies.length !== 0) {
                this.setState({suggestedMovies});
                console.log('sug movies', this.state.suggestedMovies);
            }
        }
    }

    onOptionClick(i, e) {
        const {callback} = this.props;
        const {value} = e.target;
        const filtered = this.state.suggestedMovies.filter(f => f.name === value);// || f.name.includes(value));
        let slugName = '';
        let cast = [];
        if (filtered.length === 1) {
            slugName = filtered[0].slugName;
            cast = filtered[0].cast;
        }
        const arr = [
            ...this.state.movieList.slice(0, i),
            Object.assign({}, this.state.movieList[i], {name: value, slugName, cast}),
            ...this.state.movieList.slice(i + 1)
        ];
        this.setState({movieList: arr});
        callback('movies', arr);
    }

    addMovie(e) {
        e.preventDefault();
        const {callback} = this.props;
        const arr = [...this.state.movieList, {name: '', slugName: '', cast: []}];
        this.setState({movieList: arr});
        callback('movies', arr);
    }

    removeMovie(i) {
        const {callback} = this.props;
        const {movieList} = this.state;
        const arr = [
            ...movieList.slice(0, i),
            ...movieList.slice(i + 1)
        ];
        this.setState({movieList: arr});
        callback('movies', arr);
    }

    render() {
        return <div className={b()}>
            <button className={b('button')} onClick={this.addMovie.bind(this)}>+</button>
            {this.createList()}
        </div>
    }
}

export default EditMoviesList;