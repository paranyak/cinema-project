import React, {Component} from "react";
import "../../styles/HomeLayout.less";
import Header from "../Header";
import MovieCarousel from "./MovieCarousel";
import Footer from "../Footer";
import AllMovies from "./AllMovies";

class HomeLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"HomeLayout"}>
            <Header />
            <h3>Popular</h3>
            <MovieCarousel/>
            <h3>Available Soon</h3>
            <MovieCarousel/>
            <h3>All Available Movies</h3>
            <AllMovies/>
            <Footer/>
        </div>;
    }
}

export default HomeLayout;