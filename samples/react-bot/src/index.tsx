import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Setup from "./scenes/setup";
import { Provider } from 'unstated';
import Chat from "./scenes/chat";

const App = () => (
    <Provider>
        <Router>
            <div>
                <Route path="/" exact component={Setup} />

                <Route path="/chat/:host/:appId/:appSecret" exact component={Chat} />
            </div>
        </Router>
    </Provider>
);

const HotApp = hot(module)(App);


render(<HotApp />, document.querySelector("#root"));

