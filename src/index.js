import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Layout from "./components/Layout"
import initStore from "./initStore"
import createHistory from "history/createBrowserHistory"
import { ConnectedRouter, routerMiddleware } from "react-router-redux"

const history = createHistory()
export const middleware = routerMiddleware(history)

ReactDOM.render(
  <Provider store={initStore(middleware)}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
