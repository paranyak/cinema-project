import React, {Component} from "react";
import "../../styles/AllMovies.less";
import block from "../../helpers/BEM";
import {connect} from "react-redux";
import MoviePoster from "./MoviePoster";
import {Link} from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroller";


const b = block("AllMovies");

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 20,
            hasMoreItems: true
        };
    }

    showItems() {
        const {films} = this.props;
        return (
            <div className={b()}>
                {films
                    .slice(0, this.state.items)
                    .filter(film => film.label !== 'soon')
                    .map(film =>
                        <Link key={film.id} to={`/movie/${film.id}`}>
                            <MoviePoster film={film}/>
                        </Link>
                    )}
            </div>
        );
    }

    loadMore() {
        if (this.state.items === 100) {
            this.setState({hasMoreItems: false});
        } else {
            setTimeout(() => {
                this.setState({items: this.state.items + 20});
            }, 2000);
        }

    }

    render() {
        return (
            <div>
                <div style={{height: '1200px', overflow: 'auto'}}>
                    <InfiniteScroll
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="loader"> Loading... </div>}
                        useWindow={false}
                    >
                        {this.showItems()}{" "}
                    </InfiniteScroll>{" "}
                </div>
            </div>
        )
    }
}

export default connect()(AllMovies);