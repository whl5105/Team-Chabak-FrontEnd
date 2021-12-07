import "./App.css";
import React from "react";

// import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Route } from "react-router-dom";
import { Grid } from "../elements/index";

import Header from "../components/Header";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import PostWrite from "../pages/PostWrite";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Grid margin="100px auto">
        <ConnectedRouter history={history}>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/signup" component={Signup} />
          <Route exact path="/write" component={PostWrite} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
