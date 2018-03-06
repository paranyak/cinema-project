import React, {Component} from 'react'
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import Feedback from "./Feedback";
import Footer from "../Footer";
import Header from "../Header";
import "../../styles/MovieLayout.less"
import block from "../../helpers/BEM";
import {getById} from "../../reducers";
import {connect} from "react-redux";


const b = block("MovieLayout");

//TODO: Change id
const id = 1;


class MovieLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {film} = this.props;

        return (
            <div className={b()}>
                <Header/>
                <MovieImage film={film}/>
                <MovieInfo film={film}/>
                <Feedback film={film}/>
                <Footer/>
            </div>
        )
    }
}


export default connect(state => {
        const movie = getById(state, id);
        return {film: movie};
    }
)(MovieLayout);