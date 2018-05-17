import React, {Component} from "react";
import "../styles/AllActors.less";
import block from "../helpers/BEM";
import {connect} from "react-redux";
import ActorPoster from "./ActorPoster";
import MovieCarousel from "./MovieCarousel";
import InfiniteScroll from "react-infinite-scroller";
import {getAllActorsSlugs, isActorFetchingSlug} from "../reducers";
import {fetchAdditionalActors} from "../actions/actors"
import LazyLoad from 'react-lazyload';
import {Link} from "react-router-dom";

const b = block("AllActors");

class AllActors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: 6,
            hasMoreItems: true
        };
    }

    componentWillMount() {
        this.props.fetchAllActors(this.state.items, 1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.actors.length === this.props.actors.length && this.props.isFetching && !nextProps.isFetching) {
            this.setState({...this.state, hasMoreItems: false});
        }
    }

    showItems() {
        const {actors} = this.props;
        if (actors.length !== 0) {
            return (
                <div className={b('actors')}>
                    {actors
                        .map((actor, i) =>
                            <LazyLoad key={i} height='100%' offsetBottom={250}>
                                <Link to={`/actor/${actor}`}>
                                    <ActorPoster actorSlug={actor}/>
                                </Link>
                            </LazyLoad>
                        )}
                </div>
            );
        }
    }

    loadMore(page) {
        this.props.fetchAllActors(this.state.items, page);
    }

    render() {
        if (this.props.actors.length !== 0) {
            return (
                <section className={b()}>
                    <h1 className={b('title')}>Unpublished</h1>
                    <MovieCarousel label={"unpublished"} movie={false}/>
                    <InfiniteScroll
                        loadMore={this.loadMore.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        initialLoad={false}
                        pageStart={1}
                        loader={<div className={b("loader")}>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                            <span className={b("loader-dot")}></span>
                        </div>}
                    >
                        {this.showItems()}{" "}
                    </InfiniteScroll>{" "}
                </section>
            )
        }
        return null;
    }
}

const mapDispatchToProps = (dispatch) => ({fetchAllActors: (labels, pages) => dispatch(fetchAdditionalActors(labels, pages))});

const mapStateToProps = state => {
    const actors = getAllActorsSlugs(state);
    const isFetching = isActorFetchingSlug('additional', state);
    return {actors, isFetching}
};

export default connect(mapStateToProps, mapDispatchToProps)(AllActors);
