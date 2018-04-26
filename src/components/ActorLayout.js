import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {getSelectedActor, getActorById, getCurrentUser} from "../reducers/index";
import {fetchActors} from '../actions/fetch';

import "../styles/ActorLayout.less"
import block from "../helpers/BEM";
import {connect} from "react-redux";


const b = block("ActorLayout");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_275,h_408,c_thumb,g_face/';

class ActorLayout extends Component {
    render() {
        window.scrollTo(0,0);
        const {selectedActor} = this.props;
        if (!selectedActor || selectedActor.id === undefined) {
             this.props.fetchActorById(this.props.match.params.id);
             return null;
        }
        else if (selectedActor.error) {
             return (
                 <section className={b("error")}>
                     <img width="100%" src="http://www.topdesignmag.com/wp-content/uploads/2012/06/1.-404-not-found-design.jpg"/>
                 </section>
             );
         }
         let additional = '';
         let role = this.props.user && this.props.user.role;
         if(role === 'admin') {
           additional = (      <Link to={`/edit-actor/${selectedActor.id}`}>
                                  <span className={b('edit-icon')}></span>
                                </Link>)
           }
        return (
            <section className={b()}>
                {additional}
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
                                    <p className={b("in-movie")}>{selectedActor.movies[key][0]}</p>
                                </Link>)}
                        </section>
                    </section>
                </section>
                <img className={b("image")}
                     src={link + selectedActor.image}/>
            </section>
        );
    }
}


export default connect((state, props) => {
    const actor = getActorById(state, props.match.params.id);
    const user = getCurrentUser(state);
    return {selectedActor: actor,
            user};
    }, (dispatch) => ({
        fetchActorById: (id) => dispatch(fetchActors(id))
    })
)(ActorLayout);
