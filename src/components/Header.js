import React from "react";
import { Button, Text, Grid } from "../elements";

import { history } from "../redux/configureStore";

import { useSelector, useDispatch } from "react-redux";
import { userCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  //로그인한 경우 보여지는 부분(로그아웃, 글등록 버튼)
  if (is_login) {
    return (
      <React.Fragment>
        <div
          style={{
            width: "100%",
            padding: "20px 0",
          }}
        >
          <Grid is_flex margin=" 0px auto" padding="0 20px">
            <Grid>
              <Text
                is_text
                __onClick={() => {
                  history.push("/");
                }}
              ></Text>
            </Grid>
            <Grid is_flex justify="flex-end">
              <Button
                width=" 7em"
                text_color
                text="게시물 등록"
                _onClick={() => {
                  history.push("/write");
                }}
              ></Button>
              <Button
                width=" 7em"
                text="로그아웃"
                _onClick={() => {
                  dispatch(userActions.logoutDB());
                }}
              ></Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
  //로그아웃 했을 경우 보여지는 부분(로그인, 회원가입 버튼)
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          padding: "20px 0",
        }}
      >
        <Grid is_flex margin=" 0px auto" padding="0 20px">
          <Grid>
            <Text
              is_text
              __onClick={() => {
                history.push("/");
              }}
            ></Text>
          </Grid>
          <Grid is_flex justify="flex-end">
            <Button
              width=" 7em"
              text_color
              text="로그인"
              _onClick={() => {
                history.push("/user/login");
              }}
            ></Button>
            <Button
              width=" 7em"
              text="회원가입"
              _onClick={() => {
                history.push("/user/signup");
              }}
            ></Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
Header.defaultProps = {};

export default Header;
