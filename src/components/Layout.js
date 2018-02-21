import React, {Component} from 'react'
import "../styles/Layout.less";

import Logo from "./Logo";
import Navigation from "./Navigation";
import Movie from "./Movie";

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className = "Layout">
        <aside className="Layout__aside">
          <Logo/>
          <Navigation/>
        </aside>
        <main className="Layout__payload">
          <Movie/>
        </main>
      </div>
  )
  }
}

export default Layout