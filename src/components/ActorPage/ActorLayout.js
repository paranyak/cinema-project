import React, {Component} from 'react'
import {Link} from 'react-router-dom'


import "../../styles/ActorLayout.less"
import block from "../../helpers/BEM";
import {connect} from "react-redux";


const b = block("ActorLayout");


class ActorLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {actor} = this.props;
        if (!actor) {
            return null;
        }
        return (
            <section className={b()}>
                <section className={b("general")}>
                    <h1 className={b("name")}>{actor}</h1>
                    <p className={b("info")}> Maggie Grace (born Margaret Grace Denig; September 21, 1983) is an
                        American
                        actress and model, best known for her roles as Shannon Rutherford on the ABC television series
                        Lost
                        and Kim Mills in the Taken trilogy. She has also appeared on The Twilight Saga as Irina.
                        Originally
                        from Worthington, Ohio, she went on to earn a Young Artist Award nomination in 2002 with her
                        portrayal of 15-year-old murder victim Martha Moxley in the television movie Murder in
                        Greenwich. In
                        2004, Grace was cast as Shannon Rutherford in the television series Lost, on which she was a
                        main
                        cast member for the first two seasons, winning a Screen Actors Guild Award shared with the
                        ensemble
                        cast. Leaving the series, Grace was keen to work more prominently in film, she appeared in The
                        Jane
                        Austen Book Club (both 2007), and opposite Liam Neeson as Kim Mills in Taken in 2008. She
                        reprised
                        the role in Taken 2 (2012) and Taken 3 (2015).</p>
                    <section className={b("extra")}>
                        <p className={b("born-date")}> Born on <span className={b("value")}>September 21, 1983 (age 34)</span></p>
                        <p className={b("born-city")}>Born in <span className={b("value")}>Worthington, Ohio, U.S.</span></p>
                        <p className={b("nominations")}> Nominations<span className={b("value")}>Teen Choice Award в номінації Найкращий прорив року: жіноча роль
                            у серіалі</span></p>
                        <section className={b("movies")}>
                            Films
                            <Link className={b("movie-link")} to={`/movie/1`}>
                                <p className={b("in-movie")}>The Hurricane Heist</p>
                            </Link>
                        </section>
                    </section>

                </section>
                <img className={b("image")}
                     src="https://res.cloudinary.com/demo/image/fetch/w_275,h_408,c_thumb,g_face/https://images-na.ssl-images-amazon.com/images/M/MV5BNjU1NjM2YjMtZTUxMi00NWE2LWE1Y2UtZjI1NTM1YTA1NmY1XkEyXkFqcGdeQXVyMjA0MzUxMQ@@._V1_.jpg"/>
            </section>
        );
    }
}

export default connect((state, props) => {
        console.log("CONNECT", props.match.params.id);
        return {actor: props.match.params.id};
    }
)(ActorLayout);