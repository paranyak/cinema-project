Movie Poster Example

```js 
const React = require("react");
const ReactDOM = require("react-dom");
class MoviePoster extends React.Component {
    render() {
        const {film, filmId} = this.props;
        if (!film || film === undefined) {
            this.props.fetchMovieById(filmId);
            return null;
        }
        return (
            <article className={b()}>
            	<picture><img src={link + film.image} className={b("image")}/></picture>
                <footer className={b("additional-info")}>
                    <h3 className={b('name')}>{film.name}</h3>
                    <p className={b('genre')}>{film.genre}</p>
                    <span className={b('rating')}>{film.rating}</span>
                </footer>
            </article>
        )
    }
}

ReactDOM.render(<MoviePoster />, document.getElementById('root'))

```