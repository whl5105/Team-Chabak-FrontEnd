import React from "react";
import { Button, Text, Grid } from "../elements";

import { useHistory } from "react-router-dom";
const Header = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <Grid is_flex margin=" 0px auto">
        <Grid>
          <Text size="2em" bold="200">
            Chabak
          </Text>
        </Grid>
        <Grid is_flex>
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/");
            }}
          ></Button>
          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/");
            }}
          ></Button>
          <Button
            text="로그아웃"
            _onClick={() => {
              history.push("/");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
