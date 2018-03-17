import React, {Component} from 'react'

import "../../styles/Actors.less";
import block from "../../helpers/BEM";

const b = block("Actor-Layout");


class ActorLayout extends Component {
    render() {
        return null
    }
}

export default connect(state => {
    const movies = getAllMovies(state);
    return {
        films: movies.map(movie => ({
            id: movie.id,
            name: movie.name,
            image: movie.image,
            rating: movie.rating,
            genre: movie.genre,
            label: movie.label
        }))
    }
})(ActorLayout);