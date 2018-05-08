import React, {Component} from "react";
import "../styles/AddMovieLayout.less";
import block from '../helpers/BEM';
import AddMImages from "./AddMImages";
import AddMInfo from "./AddMInfo";
import {Redirect} from "react-router";
import slugify from 'slugify';
import {connect} from "react-redux";
import {postMovieToDB} from "../actions/fetch";

const b = block("AddMovieLayout");


class EditMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            screenshots: [],
            cast: [],
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

    async addMovieToDB() {
        const {
            screenshots,
            cast,
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

        const movie = {
            name,
            slugName: slugify(name, {replacement: '_', remove: /[.:!,;*&@^]/g}),
            image: poster,
            rating: parseFloat(rating).toString(),
            cast: [],       //cast.filter(el => el !== ''),
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

        console.log("MOVIE", movie);
        await this.props.postData(movie);
        console.log("THIS PROPS AFTER POST:", this.props);
        this.setState({fireRedirect: true})
    }

    cancelAdding() {
        console.log('Adding is canceled!!!');
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
                    <AddMImages callback={this.getStateFromChild}/>
                    <AddMInfo callback={this.getStateFromChild}/>
                    <div className={b('btns')}>
                        <button type='submit'
                                disabled={!isEnabled}
                                className={b('btn', ['submit'])}
                                onClick={this.addMovieToDB.bind(this)}
                        >Save
                        </button>
                        <button type='submit'
                                disabled={!isEnabled}
                                className={b('btn', ['submit'])}
                                onClick={this.addMovieToDB.bind(this)}
                        >Publish
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


export default connect((state, props) => {console.log("here map to props:", state, props); return {props, state}}, (dispatch) => ({postData: (movie) => dispatch(postMovieToDB(movie))})
)(EditMoviePage);