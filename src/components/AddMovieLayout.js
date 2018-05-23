import React, {Component} from "react";
import "../styles/AddMovieLayout.less";
import block from '../helpers/BEM';
import AddMovieImages from "./AddMovieImages";
import AddMovieInfo from "./AddMovieInfo";
import {Redirect} from "react-router";
import slugify from 'slugify';
import {connect} from "react-redux";
import {postMovieToDB} from "../actions/movies";
import {postActorToDB} from "../actions/actors";
import {editActorBySlug} from "../actions/actors";
import {getAllActorsSlugs} from "../reducers";

const b = block("AddMovieLayout");

class AddMovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            screenshots: [],
            actors: [],
            scheduleTime: [],
            scheduleDate: [],
            genre: [],
            format: [],
            technology: [],
            name: '',
            description: '',
            trailer: '',
            rating: '',
            duration: '',
            startDate: '',
            label: '',
            poster: ''
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(keys, values) {
        for (let k = 0; k < keys.length; k++) {
            this.setState({[keys[k]]: values[k]})
        }
    }

    async addMovieToDB(e) {
        e.preventDefault();
        const {
            screenshots,
            actors,
            scheduleDate,
            genre,
            format,
            technology,
            name,
            description,
            trailer,
            rating,
            duration,
            startDate,
            label,
            poster
        } = this.state;
        let Schedule = [];
        const scheduleTime = this.state.scheduleTime.sort();
        scheduleDate.map(d => scheduleTime.map(t => Schedule.push(d + ' ' + t)));
        actors.forEach((a) => {
            if (!a.slugName) {
                a.slugName = slugify(a.name, {replacement: '_', remove: /[.:!,;*&@^]/g, lower: true});
            }
        });

        const slugName = slugify(name, {replacement: '_', remove: /[.:!,;*&@^]/g, lower: true});

        const movie = {
            name,
            slugName,
            image: poster,
            rating: parseFloat(rating).toString(),
            cast: actors,
            description,
            screenshots,
            trailer,
            genre: genre.join(', '),
            Schedule,
            format: format.filter(f => f !== ''),
            technology: technology.filter(t => t !== ''),
            duration: {
                "hour": parseInt(duration.split(':')[0]),
                "minute": parseInt(duration.split(':')[1])
            },
            label,
            startDate: {
                "year": parseInt(startDate.split('-')[0]),
                "month": parseInt(startDate.split('-')[1]),
                "day": parseInt(startDate.split('-')[2])
            }
        };

        await this.props.postData(movie);

        this.setState({fireRedirect: true});
    }

    cancelAdding() {
        this.setState({fireRedirect: true});
    }

    render() {
        const {
            fireRedirect,
            genre,
            format,
            technology,
            name,
            description,
            trailer,
            rating,
            duration,
        } = this.state;
        const isEnabled =
            genre.filter(f => f !== '').length *
            format.filter(f => f !== '').length *
            technology.filter(f => f !== '').length *
            name.length *
            description.length *
            trailer.length *
            rating.length *
            duration.length !== 0;
        const lenCancelBtn = (isEnabled) ? '100px' : '250px';

        return (<div>
                <form className={b()}>
                    <h1 className={b('title')}>ADD MOVIE</h1>
                    <AddMovieImages callback={this.getStateFromChild}/>
                    <AddMovieInfo callback={this.getStateFromChild}/>
                    <div className={b('btns')}>
                        <button type='submit'
                                disabled={!isEnabled}
                                className={b('btn', ['submit'])}
                                onClick={this.addMovieToDB.bind(this)}
                        >Submit
                        </button>
                        <button type='button' className={b('btn')} style={{width: lenCancelBtn}}
                                onClick={this.cancelAdding.bind(this)}>Cancel
                        </button>
                    </div>
                </form>
                {fireRedirect && (<Redirect to={`/`}/>)}
            </div>
        )
    }
}


export default connect((state, props) => {
        const allActors = getAllActorsSlugs(state);
        return {allActors}
    },
    (dispatch) => ({
        postData: (movie) => dispatch(postMovieToDB(movie)),
        editActors: (actor, slug) => dispatch(editActorBySlug(slug, actor)),
        postActor: (actor) => dispatch(postActorToDB(actor))
    }))(AddMovieLayout);