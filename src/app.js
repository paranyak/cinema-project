import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import Layout from "./components/Layout";
import initStore from "./initStore";

ReactDOM.render(
  <Provider store={initStore()}>
    <Layout />
  </Provider>,
  document.getElementById("root")
);
