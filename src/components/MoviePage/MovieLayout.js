import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import "../../styles/MovieLayout.less"
import block from "../../helpers/BEM";
import {getById} from "../../reducers";
import {connect} from "react-redux";

const b = block("MovieLayout");



class MovieLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {film} = this.props;
        return (
            <div>
                <div className={b()}>
                    <MovieInfo film={film}/>
                    <MovieImage film={film}/>
                    <Feedback id={film.id}/>
                </div>
            </div>
        )
    }
}


export default connect((state, props) => {
        console.log(props.match.params.id);
        const movie = getById(state, +props.match.params.id);
        return {film: movie};
    }
)(MovieLayout);