import React, {Component} from "react";
import "../styles/EditInfo.less";
import {monthNames} from '../helpers/constants'
import block from '../helpers/BEM'
import NominationsList from "./NominationsList";

const b = block("EditInfo");

class EditActorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.actor.id,
            name: props.actor.name,
            movies: props.actor.movies,
            info: props.actor.info,
            date: props.actor.date,
            city: props.actor.city,
            nominations: props.actor.nominations
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount() {
        const {id, name, movies, info, date, city, nominations} = this.state;
        this.props.callback(
            ['id', 'name', 'movies', 'info', 'date', 'city', 'nominations'],
            [id, movies, info, date, city, nominations]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {id, name, movies, info, date, city, nominations} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['id', 'name', 'movies', 'info', 'date', 'city', 'nominations'],
                [id, name, movies, info, date, city, nominations]);
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
        const {actor} = this.props;
        const date = actor.date.split(' ');
        const month = (monthNames.indexOf(date[0]) > 8 ? '' : '0') + (monthNames.indexOf(date[0]) + 1).toString();
        const day = (parseInt(date[1].slice(0, -1)) > 9 ? '' : '0') + date[1].slice(0, -1);
        const year = date[2];
        const birthDate = year + '-' + month + '-' + day;

        return <section className={b()}>
            <h3 className={b('title')}>Actor Name</h3>
            <input className={b("input", ['name'])} name='name'
                   defaultValue={actor.name
                       .split("_")
                       .join(" ")}
                   onChange={this.onValueChange} placeholder='Please, enter the actor name'/>

            <h3 className={b('title')}>Actor Info</h3>
            <textarea className={b('input', ['textarea'])} defaultValue={actor.info}
                      placeholder='Please, enter the actor bio...' name='info' rows="5"
                      onChange={this.onValueChange}/>

            <h3 className={b("title")}>Born on</h3>
            <input type='date' className={b('input')} name='date' onChange={this.onValueChange}
                   defaultValue={birthDate}/>

            <h3 className={b("title")}>Born in</h3>
            <input className={b("input")} name='city' defaultValue={actor.city} onChange={this.onValueChange}/>

            <h3 className={b("title")}>Nominations</h3>
            <NominationsList nominations={actor.nominations} callback={this.callback.bind(this)}/>
        </section>
    }
}

export default EditActorInfo;