import React, {Component} from "react";
import "../styles/Editor.less";
import {editActorBySlug, fetchActorsSlug} from '../actions/actors';
import {fetchMovieSlug} from '../actions/movies';
import {editMovieBySlug} from '../actions/movies';
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import EditActorImage from "./EditActorImage";
import EditActorInfo from "./EditActorInfo";
import {getActorBySlug, getMovieBySlug, isMovieFetchingSlug} from "../reducers";

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

    componentWillMount(props) {
      if (this.props.filmsToFetch && this.props.isFilmFetching) {
        this.props.filmsToFetch.forEach((film) => {
          if(!this.props.isFilmFetching(film)) {
            this.props.fetchMovieBySlug(film);
          }
        })
      }
    }

    getStateFromChild(keys, values) {
        keys = keys || []
        let requiredFields = [ "info", "date", "city",  "name"];
        let canSubmit = true;
        for (let k = 0; k < keys.length; k++) {
            this.setState({[keys[k]]: values[k]});
            if(values[k] && requiredFields.includes(keys[k]) &&( values[k].length == 0 || Object.values(values[k]).includes(NaN))){
                canSubmit = false;
            }
        }
        let submitButton = document.querySelector(".Editor__btn_submit");
        submitButton.style.visibility = canSubmit ? 'initial' : 'hidden';
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
        console.log(movies, "ppppppppppppp");
        if (movies.length !== 0 && typeof movies[0] === 'object') {
            newMovies = movies.map(m => m.slugName).filter(slugName => slugName.trim() !== '');
            movies.filter(el => el.slugName.trim() !== '')
                .map(el => {
                    const cast = (el.cast.includes(actor.slugName)) ? [...el.cast] : [...el.cast, actor.slugName];
                    this.props.editMovies({cast}, el.slugName);
                });
            oldMovies.map(o => {
                const a = movies.filter(n => n.slugName === o.slugName);
                if (a.length === 0) {
                    // delete current actor from Movie with ID we don't use any more
                    const cast = o.cast.filter(el => el !== actor.slugName);
                    this.props.editMovies({cast}, o.slugName);
                }
            });
        }
        console.log(nominations);
        const actorToAdd = {
            movies: newMovies,
            name,
            info,
            date,
            city,
            nominations: nominations.filter(el => el !== ''),
            image
        };

        await this.props.editActor(actorToAdd, actor.slugName);
        this.setState({fireRedirect: true});
    }

    cancelEditing() {
        this.setState({fireRedirect: true});
    }

    render() {
        const {actor, films} = this.props;
        const {fireRedirect} = this.state;
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
        const filmsToFetch = [];
        const films = actor.movies.map(movieID => {
          let movie = getMovieBySlug(movieID, state);
          if(!movie) {
            filmsToFetch.push(movieID);
          }
          return movie;
        }).filter(movie => movie);
        const isFilmFetching = (slug) => isMovieFetchingSlug(slug, state);
        return {actor, films, filmsToFetch, isFilmFetching};
    },
    (dispatch) => ({
        fetchActorBySlug: (slug) => dispatch(fetchActorsSlug(slug)),
        editMovies: (movie, slug) => dispatch(editMovieBySlug(slug, movie)),
        editActor: (actor, slug) => dispatch(editActorBySlug(slug, actor)),
        fetchMovieBySlug: (slug) => dispatch(fetchMovieSlug(slug))
    })
)(EditActorPage);
