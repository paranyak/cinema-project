import React, { Component } from "react"

import "../styles/MovieLayoutImage.scss"
import block from "../helpers/BEM"

const b = block("MovieLayoutImage")
const linkMain = "https://res.cloudinary.com/dtnnkdylh/image/upload/w_275,h_408,c_fill/"
const linkScr = "https://res.cloudinary.com/dtnnkdylh/image/upload/w_160,h_100,c_fill,g_center/"
let linkScrCarousel = "";
const linkScrModal = "https://res.cloudinary.com/dtnnkdylh/image/upload/h_80/"

class MovieLayoutImage extends Component {
  constructor(props) {
    super(props)
    this.state = { sources: [], currentId: 0 }
    this.closeHandler = this.closeHandler.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  closeHandler() {
    let modal = document.getElementById("myModal")
    modal.style.display = "none"
    //REMOVE ALL EVENT LISTENERS
    let clone = modal.cloneNode()
    window.removeEventListener("keydown", this.handleKey)
    while (modal.firstChild) {
      clone.appendChild(modal.lastChild)
    }
    modal.parentNode.replaceChild(clone, modal)
  }

  handleKeyPress(event) {
    let newId
    let id = this.state.currentId
    if (event.key === "ArrowRight" || event.clientX >= event.target.clientWidth / 2) {
      newId = id >= this.state.sources.length - 1 ? 0 : id + 1
    } else {
      newId = id - 1 < 0 ? this.state.sources.length - 1 : id - 1
    }
    this.setState({ currentId: newId })
    let modalImg = document.getElementById("img01")
    modalImg.src = linkScrCarousel + this.state.sources[newId]
  }

  handleKey(event) {
    if (event.keyCode === 27) {
      this.closeHandler()
    } else if (event.keyCode === 39) {
      //right
      this.handleKeyPress(event)
    } else if (event.keyCode === 37) {
      //left
      this.handleKeyPress(event)
    }
  }

  mainImageHandler(e, id) {
    const w = 0.5 * window.screen.width
    linkScrCarousel = "https://res.cloudinary.com/dtnnkdylh/image/upload/w_" + Math.floor(w).toString() + "/"
    this.setState({ currentId: id })
    let modal = document.getElementById("myModal")
    let modalImg = document.getElementById("img01")
    modal.style.display = "block"
    modalImg.src = linkScrCarousel + this.state.sources[id]
    modal.addEventListener("click", e => this.handleKeyPress(e, id), false)
    window.addEventListener("keydown", this.handleKey)
  }

  changeImage(e, id) {
    this.setState({ currentId: id })
    let modalImg = document.getElementById("img01")
    modalImg.src = linkScrCarousel + this.state.sources[id]
  }

  componentWillMount() {
    const { film } = this.props
    let sourcesArray = [film.image]
    ;(film.screenshots || []).map(screen => sourcesArray.push(screen))
    this.setState({ sources: sourcesArray })
  }

  componentWillUpdate(nextProps) {
    if (nextProps !== this.props) {
      const { film } = nextProps
      let sourcesArray = [film.image]
      ;(film.screenshots || []).map(screen => sourcesArray.push(screen))
      this.setState({ sources: sourcesArray })
      return true
    }
    return false
  }

  isUrl(str) {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
    return regex.test(str)
  }

  getTrailer(film) {
    if (this.isUrl(film.trailer)) {
      //TODO: fix Some super unique title
      return (
        <iframe title="Some super unique title" className={b("trailer")} width="325" height="245" src={film.trailer} />
      )
    }

    return null
  }

  render() {
    const { film } = this.props
    let image
    if (film.image) {
      image = (
        <picture>
          <img alt="" src={linkMain + film.image} className={b("main")} onClick={e => this.mainImageHandler(e, 0)} />
        </picture>
      )
    } else {
      image = <span className={b("main", ["undefined"])} onClick={e => this.mainImageHandler(e, 0)} />
    }
    return (
      <section className={b()}>
        {image}
        <section className={b("screenshots")}>
          {(film.screenshots || []).map((screen, ind) => (
            <picture key={"screenshot" + ind.toString()}>
              <img
                alt=""
                src={linkScr + screen}
                className={b("screen")}
                onClick={e => this.mainImageHandler(e, ind + 1)}
              />
            </picture>
          ))}
        </section>
        {this.getTrailer(film)}
        <div id="myModal" className={b("modal")}>
          <span className={b("close")} onClick={e => this.closeHandler(e)}>
            &times;
          </span>
          <picture>
            <img alt="" className={b("modal-content")} id="img01" />
          </picture>
          <div className={b("arrow-left")} />
          <div className={b("arrow-right")} />
          <section className={b("screenshots-modal")}>
            {this.state.sources.map((screen, ind) => (
              <picture key={"modal" + ind.toString()}>
                <img
                  alt=""
                  src={linkScrModal + screen}
                  className={b("screen-modal")}
                  onClick={e => this.changeImage(e, ind)}
                />
              </picture>
            ))}
          </section>
        </div>
      </section>
    )
  }
}

export default MovieLayoutImage
