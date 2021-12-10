import "./App.css";
import React, { useEffect, useState } from "react";

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

import styled from "styled-components";
import bgimg from "../1.jpg";

function App() {
  return (
    <React.Fragment>
      <Bg>
        <Grid margin="auto">
          <Header></Header>
          <Grid
            margin="0px auto"
            bg="#ffffff"
            height="90vh"
            overflow="scroll"
            padding="20px"
          >
            <ConnectedRouter history={history}>
              <Route exact path="/" component={Main} />
              <Route exact path="/detail" component={Detail} />
              <Route exact path="/user/login" component={Login} />
              <Route exact path="/user/signup" component={Signup} />
              <Route exact path="/detail/:idx" component={Detail} />
              <Route exact path="/write" component={PostWrite} />
              <Route exact path="/write/:idx" component={PostWrite} />
            </ConnectedRouter>
          </Grid>
        </Grid>
      </Bg>
    </React.Fragment>
  );
}
const BgImg = styled.img`
  /* position: absolute;
  z-index: -999;
  width: 100%; */
  /* height: 100vh; */
`;
const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bgimg});
`;
export default App;
