import MainView  from "./components/main-view/main-view";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import moviesApp from "./reducers/reducers";

const store = createStore(moviesApp);

/**
 * @description Main component (will eventually use all the others)
 */
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

/**
 * @description Find the root of our app
 */
const container = document.getElementsByClassName("app-container")[0];

/**
 * @description Tell React to render our app in the root DOM element
 */
ReactDOM.render(React.createElement(MyFlixApplication), container);
