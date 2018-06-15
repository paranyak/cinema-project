import React, { Component } from "react"
import "../styles/Editor.scss"
import { getActorBySlug, getMovieBySlug, isActorFetchingSlug } from "../reducers"
import { editActorBySlug, fetchActorsSlug } from "../actions/actors"
import { editMovieBySlug, fetchMovieSlug } from "../actions/movies"
import { connect } from "react-redux"
import block from "../helpers/BEM"
import { Redirect } from "react-router"
import MovieImages from "./MovieImages"
import MovieInfo from "./MovieInfo"

const b = block("Editor")

class EditMoviePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fireRedirect: false,
      poster: "",
      screenshots: [],
      rating: 0,
      duration: "",
      name: "",
      description: "",
      scheduleTime: [],
      scheduleDate: [],
      genre: "",
      format: [],
      technology: [],
      trailer: "",
      cast: [],
      oldCast: props.oldCast,
      startDate: {},
      label: "",
    }
    this.getStateFromChild = this.getStateFromChild.bind(this)
  }

  componentWillMount(props) {
    if (this.props.actorsToFetch && this.props.isActorFetching) {
      this.props.actorsToFetch.forEach(actor => {
        if (!this.props.isActorFetching(actor)) {
          this.props.fetchActorBySlug(actor)
        }
      })
    }
  }

  getStateFromChild(keys, values) {
    let requiredFields = [
      "startDate",
      "duration",
      "name",
      "description",
      "genre",
      "format",
      "technology",
      "trailer",
      "rating",
    ]
    let canSubmit = true
    for (let k = 0; k < keys.length; k++) {
      this.setState({ [keys[k]]: values[k] })
      if (
        requiredFields.includes(keys[k]) &&
        (values[k] && (values[k].length === 0 || Object.values(values[k]).includes(NaN) || values[k][0] === ""))
      ) {
        canSubmit = false
      }
    }
    let submitButton = document.querySelector(".Editor__btn_submit")
    submitButton.style.visibility = canSubmit ? "initial" : "hidden"
  }

  async editMovieInDB(e) {
    e.preventDefault()
    const {
      poster,
      screenshots,
      rating,
      duration,
      name,
      label,
      description,
      scheduleDate,
      startDate,
      genre,
      format,
      technology,
      trailer,
      cast,
      oldCast,
    } = this.state
    const { film } = this.props
    const durationIsObject = typeof duration === "object"

    let Schedule = []
    const scheduleTime = this.state.scheduleTime.sort()
    if (scheduleDate && scheduleTime) {
      scheduleDate.map(d => scheduleTime.map(t => Schedule.push(d + " " + t)))
    }

    const convRating = rating ? parseFloat(rating) : "-.-"

    let newCast = cast

    if (cast && cast.length !== 0 && typeof cast[0] === "object") {
      newCast = cast.map(c => c.slugName).filter(slug => slug.trim() !== "")
      cast.filter(el => el.slugName.trim() !== "").forEach(el => {
        const movies = el.movies.includes(film.slugName) ? [...el.movies] : [...el.movies, film.slugName]
        this.props.editActors({ movies }, el.slugName)
      })
      oldCast.forEach(o => {
        const a = cast.filter(n => n.slugName === o.slugName)
        if (a.length === 0) {
          // delete current movie from Actor with ID we don't use any more
          const movies = o.movies.filter(el => el !== film.slugName)
          this.props.editActors({ movies }, o.slugName)
        }
      })
    }

    const movie = {
      name,
      cast: newCast,
      image: poster,
      rating: convRating,
      description,
      screenshots,
      trailer,
      Schedule,
      genre: Array.isArray(genre) ? genre.join(", ") : genre,
      format,
      label,
      technology,
      duration: durationIsObject
        ? duration
        : {
            hour: parseInt(duration.split(":")[0]),
            minute: parseInt(duration.split(":")[1]),
          },
      startDate,
    }

    await this.props.editMovie(movie, film.slugName)
    this.setState({ fireRedirect: true })
  }

  cancelEditing() {
    console.log("Editing is canceled!!!")
    this.setState({ fireRedirect: true })
  }

  render() {
    const { film, oldCast } = this.props
    const { fireRedirect } = this.state
    if (!film || film.slugName === undefined) {
      this.props.fetchMovieBySlug(this.props.match.params.slug.toLowerCase())
      return null
    }
    let redirect
    if (film.published) {
      redirect = <Redirect to={`/movie/${film.slugName}`} />
    } else {
      redirect = <Redirect to={`/`} />
    }
    console.log('state', this.state);

    return (
      <div>
        <form className={b()}>
          <h1 className={b("title")}>EDIT MOVIE</h1>
          <MovieImages film={film} callback={this.getStateFromChild} />
          <MovieInfo film={film} actors={oldCast} callback={this.getStateFromChild} />
          <div className={b("btns")}>
            <button type="submit" className={b("btn", ["submit"])} onClick={this.editMovieInDB.bind(this)}>
              Save
            </button>
            <button type="button" className={b("btn", ["cancel"])} onClick={this.cancelEditing.bind(this)}>
              Cancel
            </button>
          </div>
        </form>
        {fireRedirect && redirect}
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    const slug = props.match.params.slug.toLowerCase()
    const film = getMovieBySlug(slug, state) || []
    let actorsToFetch = []
    const isActorFetching = slug => isActorFetchingSlug(slug, state)
    const actors =
      film.cast &&
      film.cast
        .map(actorSlug => {
          let actor = getActorBySlug(actorSlug, state)
          if (!actor) {
            actorsToFetch.push(actorSlug)
          }
          return actor
        })
        .filter(actor => actor)
    return { film, oldCast: actors, isActorFetching, actorsToFetch }
  },
  dispatch => ({
    fetchMovieBySlug: slug => dispatch(fetchMovieSlug(slug)),
    editActors: (actor, slug) => dispatch(editActorBySlug(slug, actor)),
    editMovie: (movie, slug) => dispatch(editMovieBySlug(slug, movie)),
    fetchActorBySlug: slug => dispatch(fetchActorsSlug(slug)),
  }),
)(EditMoviePage)
