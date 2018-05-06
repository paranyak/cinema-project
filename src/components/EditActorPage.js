import React, {Component} from "react";
import "../styles/Editor.less";
import {getActorById} from "../reducers/index";
import {fetchActors} from '../actions/fetch';
import block from "../helpers/BEM";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import EditActorImage from "./EditActorImage";
import EditActorInfo from "./EditActorInfo";
import {monthNames} from '../helpers/constants'
import slugify from "slugify";

const b = block("Editor");

class EditActorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false,
            id: '',
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

    editActorInDB(e) {
        e.preventDefault();
        const {
            id,
            info,
            date,
            city,
            nominations,
            image,
            name
        } = this.state;

        let birthDay = date;

        if (date.includes('-')) {
            const dateArr = date.split('-');
            const month = monthNames[parseInt(dateArr[1]) - 1];
            const year = dateArr[0];
            const day = dateArr[2];
            birthDay = month + ' ' + day + ', ' + year;
        }

        const actor = {
            id,
            // movies,
            name: slugify(name, "_"),
            info,
            date: birthDay,
            city,
            nominations: nominations.filter(el => el !== ''),
            image,
            name
        };

        console.log("EDITED ACTOR", actor);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch(`http://localhost:3000/actors/${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(actor)
        }).then((res) => res.json());

        alert('Form is successfully edited!');

        this.setState({fireRedirect: true});
    }

    cancelEditing() {
        console.log('Editing is canceled!!!');
        this.setState({fireRedirect: true});
    }

    render() {
        const {selectedActor} = this.props;
        const {fireRedirect} = this.state;
        console.log('I need', this.state);
        if (!selectedActor || selectedActor.id === undefined) {
            this.props.fetchActorById(this.props.match.params.id.split("__")[0]);
            return null;
        }
        else if (selectedActor.error) {
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
                    <EditActorImage actorImg={selectedActor.image} callback={this.getStateFromChild}/>
                    <EditActorInfo actor={selectedActor} callback={this.getStateFromChild}/>
                    <div className={b('btns')}>
                        <button type='submit' className={b('btn', ['submit'])}
                                onClick={this.editActorInDB.bind(this)}>Save
                        </button>
                        <button type='button' className={b('btn', ['cancel'])}
                                onClick={this.cancelEditing.bind(this)}>Cancel
                        </button>
                    </div>
                </form>
                {fireRedirect && (<Redirect to={`/actor/${selectedActor.id + "__" + selectedActor.name}`}/>)}
            </div>
        );
    }
}


export default connect((state, props) => {
        const actor = getActorById(state, props.match.params.id.split("__")[0]);
        return {selectedActor: actor};
    }, (dispatch) => ({
        fetchActorById: (id) => dispatch(fetchActors(id))
    })
)(EditActorPage);
