import "./App.css";
import React from "react";
import { useDispatch } from "react-redux";
import { userCreators as userActions } from "../redux/modules/user";

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
import OAuth2RedirectHandler from "./OAuth2RedirectHandler";

import styled from "styled-components";
import bgimg from "../1.jpg";

function App() {
  const dispatch = useDispatch();
  const is_local = localStorage.getItem("username") ? true : false;

  React.useEffect(() => {
    if (is_local) {
      dispatch(userActions.loginCheckDB());
    }
  }, []);

  return (
    <React.Fragment>
      <BgText>
        <h3 style={{ fontFamily: "Comfortaa" }}>chabak</h3>
        <p>
          차박에서 다양한 정보를 <br />
          공유하고 소통해보세요!{" "}
        </p>
      </BgText>
      <Bg>
        <Grid margin="auto">
          <Header></Header>
          <Grid
            margin="0px auto"
            bg="#f7fbff"
            height="90vh"
            overflow="scroll"
            radius="20px"
            position="absolute"
            border="20px solid transparent"
          >
            <ConnectedRouter history={history}>
              <Route exact path="/" component={Main} />
              <Route exact path="/detail" component={Detail} />
              <Route exact path="/user/login" component={Login} />
              <Route exact path="/user/signup" component={Signup} />
              <Route exact path="/detail/:idx" component={Detail} />
              <Route exact path="/write" component={PostWrite} />
              <Route exact path="/write/:idx" component={PostWrite} />
              <Route
                path="/oauth/callback/kakao"
                component={OAuth2RedirectHandler}
              ></Route>
            </ConnectedRouter>
          </Grid>
        </Grid>
      </Bg>
    </React.Fragment>
  );
}
const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bgimg});
`;
const BgText = styled.div`
width: 300px;
text-align : center;
  color: :#c7c7c7;
  position: absolute;
  top: 29%;
  left: 5%;
  & h3{
    font-size: 60px;
    color: #fff;
    margin: 0px;
  }
  & p{
    color:#fff;
    padding:5px ;
    font-size: 19px;
  }
`;
export default App;
