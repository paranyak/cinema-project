import React, {Component} from "react";
import "../styles/Editor.less";
import {editActorById, editMovieById, fetchActors, fetchActorsSlug} from '../actions/fetch';
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import EditActorImage from "./EditActorImage";
import EditActorInfo from "./EditActorInfo";
import {monthNames} from '../helpers/constants'
import {getActorBySlug, getMovieById} from "../reducers";

const b = block("Editor");

class EditActorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            movies: [],
            oldMovies: props.films,
            info: '',
            date: '',
            city: '',
            nominations: [],
            image: '',
            name: ''
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(keys, values) {
        for (let k = 0; k < keys.length; k++) {
            this.setState({[keys[k]]: values[k]})
        }
    }

    async editActorInDB(e) {
        e.preventDefault();
        const {
            info,
            date,
            city,
            nominations,
            image,
            name,
            movies,
            oldMovies
        } = this.state;
        const {actor} = this.props;

        let birthDay = date;

        if (date.includes('-')) {
            const dateArr = date.split('-');
            const month = monthNames[parseInt(dateArr[1]) - 1];
            const year = dateArr[0];
            const day = dateArr[2];
            birthDay = month + ' ' + day + ', ' + year;
        }

        let newMovies = movies;

        if (movies.length !== 0 && typeof movies[0] === 'object') {
            newMovies = movies.map(m => m._id).filter(id => id.trim() !== '');
            movies.filter(el => el._id.trim() !== '')
                .map(el => {
                    const cast = (el.cast.includes(actor._id)) ? [...el.cast] : [...el.cast, actor._id];
                    this.props.editMovies({cast}, el._id);
                });
            oldMovies.map(o => {
                const a = movies.filter(n => n._id === o._id);
                console.log('a', a);
                if (a.length === 0) {
                    // delete current actor from Movie with ID we don't use any more
                    const cast = o.cast.filter(el => el !== actor._id);
                    this.props.editMovies({cast}, o._id);
                }
            });
        }

        const actorToAdd = {
            movies: newMovies,
            name,
            info,
            date: birthDay,
            city,
            nominations: nominations.filter(el => el !== ''),
            image
        };

        console.log("EDITED ACTOR", actorToAdd);

        await this.props.editActor(actorToAdd, actor._id);
        this.setState({fireRedirect: true});
    }

    cancelEditing() {
        console.log('Editing is canceled!!!');
        this.setState({fireRedirect: true});
    }

    render() {
        const {actor, films} = this.props;
        const {fireRedirect} = this.state;
        console.log('I need', this.state);
        if (!actor || actor.slugName === undefined) {
            this.props.fetchActorBySlug(this.props.match.params.slug);
            return null;
        }
        else if (actor.error) {
            return (
                <section className={b("error")}>
                    <img width="100%"
                         src="http://www.topdesignmag.com/wp-content/uploads/2012/06/1.-404-not-found-design.jpg"/>
                </section>
            );
        }
        return (<div>
                <form className={b()}>
                    <h1 className={b('title')}>EDIT ACTOR</h1>
                    <EditActorImage actorImg={actor.image} callback={this.getStateFromChild}/>
                    <EditActorInfo actor={actor} films={films} callback={this.getStateFromChild}/>
                    <div className={b('btns')}>
                        <button type='submit' className={b('btn', ['submit'])}
                                onClick={this.editActorInDB.bind(this)}>Save
                        </button>
                        <button type='button' className={b('btn', ['cancel'])}
                                onClick={this.cancelEditing.bind(this)}>Cancel
                        </button>
                    </div>
                </form>
                {fireRedirect && (<Redirect to={`/actor/${actor.slugName}`}/>)}
            </div>
        );
    }
}


export default connect((state, props) => {
        const actor = getActorBySlug(state, props.match.params.slug);
        const films = actor.movies.map(movieID => getMovieById(state, movieID));
        return {actor, films};
    },
    (dispatch) => ({
        fetchActorBySlug: (slug) => dispatch(fetchActorsSlug(slug)),
        editMovies: (movie, id) => dispatch(editMovieById(id, movie)),
        editActor: (actor, id) => dispatch(editActorById(id, actor))
    })
)(EditActorPage);
