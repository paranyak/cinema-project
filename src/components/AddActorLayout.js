import React, {Component} from "react";
import block from "../helpers/BEM";
import "../styles/AddActorLayout.less";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import AddActorImage from "./AddActorImage";
import AddActorInfo from "./AddActorInfo";
import slugify from "slugify/index";
import {postActorToDB, checkName} from "../actions/actors";
import {editMovieBySlug} from "../actions/movies";
import {getCheckedNameActor} from "../reducers/index";

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
        movies.forEach((movie) => {
            if (!movie.slugName) {
                movie.slugName = slugify(movie.name, {replacement: '_', remove: /[.:!,;*&@^]/g, lower: true});
            }
        });
        let slugName = slugify(name, {
            replacement: '_',
            remove: /[.:!,;*&@^]/g,
            lower: true
        });

        await this.props.checkName(name);
        if (this.props.checked.slugName) {
            if (this.props.checked.city === city) {
                alert("This actor already exist");
                return;
            } else {
                console.log("they are with tha same names");
                slugName += "_" + city;
            }
        }

        const actorToAdd = {
            movies,
            slugName,
            name,
            info,
            date: convDate,
            city,
            nominations: nominations.filter(el => el !== ''),
            image
        };
        console.log(actorToAdd, "00000000000000000000000000000000000000000");
        this.props.postData(actorToAdd);

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
                <AddActorImage callback={this.getStateFromChild}/>
                <AddActorInfo callback={this.getStateFromChild}/>
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
            {fireRedirect && (<Redirect to={`/`}/>)}
        </div>)
    }
}


export default connect((state, props) => {
        let checked = getCheckedNameActor(state);
        return {checked};
    }, (dispatch) => ({
        checkName: (name) => dispatch(checkName(name, 'actors')),
        postData: (actor) => dispatch(postActorToDB(actor)),
        editMovies: (movie, slug) => dispatch(editMovieBySlug(slug, movie))
    })
)(AddActorLayout);