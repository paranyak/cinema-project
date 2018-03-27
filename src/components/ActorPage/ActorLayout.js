import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {getSelectedActor} from "../../reducers";
import {fetchActors} from '../../actions';

import "../../styles/ActorLayout.less"
import block from "../../helpers/BEM";
import {connect} from "react-redux";


const b = block("ActorLayout");


class ActorLayout extends Component {
    constructor(props) {
        super(props);
        this.props.fetchActorById(this.props.match.params.id);

    }

    render() {
        const {selectedActor} = this.props;
        if (selectedActor.nominations === undefined) {
            console.log("UNDEFINED");
            return null;
        }
        return (
            <section className={b()}>
                <section className={b("general")}>
                    <h1 className={b("name")}>{selectedActor.id}</h1>
                    <p className={b("info")}>{selectedActor.info}</p>
                    <section className={b("extra")}>
                        <p className={b("born-date")}> Born on <span className={b("value")}>{selectedActor.date}</span>
                        </p>
                        <p className={b("born-city")}>Born in <span className={b("value")}>{selectedActor.city}</span>
                        </p>
                        <p className={b("nominations")}> Nominations
                            {selectedActor.nominations.map((n, ind) => <span className={b("value")}
                                                                             key={ind}>{n}</span>)}
                        </p>
                        <section className={b("movies")}>
                            Films
                            {Object.keys(selectedActor.movies).map((key, index) =>
                                <Link className={b("movie-link")} to={`/movie/${key}`} key={index}>
                                    <p className={b("in-movie")}>{selectedActor.movies[key]}</p>
                                </Link>)}
                        </section>
                    </section>

                </section>
                <img className={b("image")}
                     src={selectedActor.image}/>
            </section>
        );
    }
}


export default connect((state, props) => {
        const actor = getSelectedActor(state);
        return {selectedActor: actor};
    }, (dispatch) => ({
        fetchActorById: (id) => fetchActors(id)(dispatch)
    })
)(ActorLayout);