import "./App.css";
import React from "react";
import PostWrite from "../pages/PostWrite";

import { Grid, Button } from "../elements";

import { Route } from "react-router-dom";

function App() {


  return (
    <React.Fragment>
      <Grid>
        <Route path='/write' exact component={PostWrite}></Route>
      </Grid>
    </React.Fragment>
  );
}

export default App;
