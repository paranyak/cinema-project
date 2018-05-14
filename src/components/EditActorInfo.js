import React, {Component} from "react";
import "../styles/EditInfo.less";
import {monthNames} from '../helpers/constants'
import block from '../helpers/BEM'
import NominationsList from "./NominationsList";
import EditMoviesList from "./EditMoviesList";

const b = block("EditInfo");

class EditActorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: props.actor.movies,
            info: props.actor.info,
            date: props.actor.date,
            city: props.actor.city,
            nominations: props.actor.nominations,
            name: props.actor.name
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        const {movies, info, date, city, nominations, name} = this.state;
        this.props.callback(
            ['movies', 'info', 'date', 'city', 'nominations', 'name'],
            [movies, info, date, city, nominations, name]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {movies, info, date, city, nominations, name} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['movies', 'info', 'date', 'city', 'nominations', 'name'],
                [movies, info, date, city, nominations, name]);
        }
    }

    onValueChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    callback(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {actor, films} = this.props;
        const {date} = actor;
        const month = (date.month > 9 ? '' : '0') + date.month.toString();
        const day = (date.day > 9 ? '' : '0') + date.day.toString();
        const year = date.year.toString();
        const birthDate = year + '-' + month + '-' + day;

        return <section className={b()}>
            <h3 className={b('title')}>Actor Name</h3>
            <input className={b("input", ['name'])} name='name'
                   defaultValue={actor.name}
                   onChange={this.onValueChange} placeholder='Please, enter the actor name'/>

            <h3 className={b('title')}>Short Info</h3>
            <textarea className={b('input', ['textarea'])} defaultValue={actor.info}
                      placeholder='Please, enter the actor bio...' name='info' rows="5"
                      onChange={this.onValueChange}/>

            <h3 className={b("title")}>Date of birth</h3>
            <input type='date' className={b('input')} name='date' onChange={this.onValueChange}
                   defaultValue={birthDate}/>

            <h3 className={b("title")}>City of birth</h3>
            <input className={b("input")} name='city' defaultValue={actor.city} onChange={this.onValueChange}/>

            <h3 className={b("title")}>Nominations</h3>
            <NominationsList nominations={actor.nominations} callback={this.callback}/>

            <h3 className={b("title")}>Movies</h3>
            <EditMoviesList movies={films} callback={this.callback}/>
        </section>
    }
}

export default EditActorInfo;
