import "./App.css";
import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Grid } from "../elements/index";

import Header from "../components/Header";
import Main from "../pages/Main";
import Detail from "../pages/Detail";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <Grid margin="0 auto">
        <BrowserRouter>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail" component={Detail} />
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
