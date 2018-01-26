/* eslint-env node, es6 */

import React from "react"; // eslint-disable-line no-unused-vars
import { Provider } from "react-redux"; // eslint-disable-line no-unused-vars
import { createStore } from "redux";
import { appReducer } from "./Reducer";
import Container from "./Container"; // eslint-disable-line no-unused-vars

const store = createStore(appReducer);

const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

export default App;
