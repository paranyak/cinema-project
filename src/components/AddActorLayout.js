import React, {Component} from "react";
import block from "../helpers/BEM";
import "../styles/AddActorLayout.less";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import AddAImage from "./AddAImage";
import AddAInfo from "./AddAInfo";
import slugify from "slugify/index";
import {postActorToDB} from "../actions/actors";
import {editMovieBySlug} from "../actions/movies";

const b = block("AddActorLayout");

class AddActorLayout extends Component {
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
            name: '',
            link: ''
        };
        this.getStateFromChild = this.getStateFromChild.bind(this);
    }

    getStateFromChild(keys, values) {
        for (let k = 0; k < keys.length; k++) {
            this.setState({[keys[k]]: values[k]})
        }
    }

    async addActorToDB(e) {
        e.preventDefault();
        const {
            movies,
            info,
            date,
            city,
            nominations,
            image,
            name
        } = this.state;

        let convDate = date;
        if (typeof date === 'string') {
            const splitDate = date.split("-");
            convDate = {
                year: parseInt(splitDate[0]),
                month: parseInt(splitDate[1]),
                day: parseInt(splitDate[2])
            };
        }

        const newMovies = movies.map(m => m.slugName).filter(slug => slug !== '');
        const slugName = slugify(name, {replacement: '_', remove: /[.:!,;*&@^]/g, lower: true});


        const actorToAdd = {
            movies: newMovies,
            slugName,
            name,
            info,
            date: convDate,
            city,
            nominations: nominations.filter(el => el !== ''),
            image
        };
        console.log('ACTOR', actorToAdd);

        this.props.postData(actorToAdd);

        if (movies.length !== 0 && typeof movies[0] === 'object') {
            movies.filter(el => el.slugName.trim() !== '')
                .map(el => {
                    const cast = (el.cast.includes(slugName)) ? [...el.cast] : [...el.cast, slugName];
                    this.props.editMovies({cast}, el.slugName);
                });
        }

        this.setState({fireRedirect: true, link: slugName});
    }

    cancelAdding() {
        this.setState({fireRedirect: true});
    }


    render() {
        const {
            fireRedirect,
            info,
            city,
            name
        } = this.state;

        const isEnabled =
            name.length *
            info.length *
            city.length !== 0;
        const lenCancelBtn = (isEnabled) ? '100px' : '250px';

        return (<div>
            <form className={b()}>
                <h1 className={b('title')}>ADD ACTOR</h1>
                <AddAImage callback={this.getStateFromChild}/>
                <AddAInfo callback={this.getStateFromChild}/>
                <div className={b('btns')}>
                    <button type='submit' className={b('btn', ['submit'])}
                            disabled={!isEnabled}
                            onClick={this.addActorToDB.bind(this)}>
                        Submit
                    </button>
                    <button type='button' className={b('btn', ['cancel'])}
                            style={{width: lenCancelBtn}} onClick={this.cancelAdding.bind(this)}>
                        Cancel
                    </button>
                </div>
            </form>
            {fireRedirect && (<Redirect to={`/allactors`}/>)}
        </div>)
    }
}

export default connect(null, (dispatch) => ({
    postData: (actor) => dispatch(postActorToDB(actor)),
    editMovies: (movie, slug) => dispatch(editMovieBySlug(slug, movie))
})
)(AddActorLayout);