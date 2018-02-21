import React, {Component} from 'react'
import '../styles/Navigation.less'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      links : [
        {name: "movies", url:"/movies"},
        {name: "cinemas", url:"/cinemas"},
        {name: "actors", url:"/actors"}
      ]
    }
  }

  render() {
    return (
      <nav className="Navigation">
        {this.state.links.map( ({name, url}) => <a className="Navigation__link" href={url}>{name}</a>)}
      </nav>
    )
  }
}

export default Navigation