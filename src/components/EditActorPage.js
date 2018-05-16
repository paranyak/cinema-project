import React, {Component} from "react";
import "../styles/Editor.less";
import {editActorBySlug, fetchActorsSlug} from '../actions/actors';
import {editMovieBySlug} from '../actions/movies';
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import EditActorImage from "./EditActorImage";
import EditActorInfo from "./EditActorInfo";
import {getActorBySlug, getMovieBySlug} from "../reducers";

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

        let newMovies = movies;

        if (movies.length !== 0 && typeof movies[0] === 'object') {
            newMovies = movies.map(m => m.slugName).filter(slugName => slugName.trim() !== '');
            movies.filter(el => el.slugName.trim() !== '')
                .map(el => {
                    const cast = (el.cast.includes(actor.slugName)) ? [...el.cast] : [...el.cast, actor.slugName];
                    this.props.editMovies({cast}, el.slugName);
                });
            oldMovies.map(o => {
                const a = movies.filter(n => n.slugName === o.slugName);
                console.log('a', a);
                if (a.length === 0) {
                    // delete current actor from Movie with ID we don't use any more
                    const cast = o.cast.filter(el => el !== actor.slugName);
                    this.props.editMovies({cast}, o.slugName);
                }
            });
        }

        const actorToAdd = {
            movies: newMovies,
            name,
            info,
            date,
            city,
            nominations: nominations.filter(el => el !== ''),
            image
        };

        console.log("EDITED ACTOR", actorToAdd);

        await this.props.editActor(actorToAdd, actor.slugName);
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
    const slug = props.match.params.slug.toLowerCase();
        const actor = getActorBySlug(slug, state);
        const films = actor.movies.map(movieID => getMovieBySlug(movieID, state));
        return {actor, films};
    },
    (dispatch) => ({
        fetchActorBySlug: (slug) => dispatch(fetchActorsSlug(slug)),
        editMovies: (movie, slug) => dispatch(editMovieBySlug(slug, movie)),
        editActor: (actor, slug) => dispatch(editActorBySlug(slug, actor))
    })
)(EditActorPage);
