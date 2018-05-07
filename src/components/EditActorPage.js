import React, {Component} from "react";
import "../styles/Editor.less";
import {getActorById} from "../reducers/index";
import {fetchActors, fetchActorsSlug} from '../actions/fetch';
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import EditActorImage from "./EditActorImage";
import EditActorInfo from "./EditActorInfo";
import {monthNames} from '../helpers/constants'
import slugify from "slugify";
import {getActorBySlug} from "../reducers";

const b = block("Editor");

class EditActorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            movies: [],
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
            name
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

        const actorToAdd = {
            // movies,
            name,
            info,
            date: birthDay,
            city,
            nominations: nominations.filter(el => el !== ''),
            image
        };

        console.log("EDITED ACTOR", actorToAdd);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const result = await fetch(`http://localhost:3000/actors/${actor._id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(actorToAdd)
        });
        console.log('res', result);
        if (!result.ok) {
            alert('Your form was not submitted!');
        }
        else {
            const resToJson = await result.json();
            console.log('result to json', resToJson);
            this.setState({fireRedirect: true})
        }
    }

    cancelEditing() {
        console.log('Editing is canceled!!!');
        this.setState({fireRedirect: true});
    }

    render() {
        const {actor} = this.props;
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
                    <EditActorInfo actor={actor} callback={this.getStateFromChild}/>
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
        return {actor};
    },
    (dispatch) => ({fetchActorBySlug: (slug) => dispatch(fetchActorsSlug(slug))})
)(EditActorPage);
