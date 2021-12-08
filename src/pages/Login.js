import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { userCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  //-- state --
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    console.log(id, pwd);
    dispatch(userActions.loginDB(id, pwd));
  };
  return (
    <React.Fragment>
      <Grid>
        <Text bold size="30px" color="333">
          로그인
        </Text>
        {/* -- 아이디 --  */}
        <Grid>
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          ></Input>
        </Grid>
        {/* -- 비밀번호 --  */}
        <Grid>
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          ></Input>
        </Grid>
        <Text color="red">아이디 혹은 비밀번호가 올바르지 않습니다.</Text>
        {/*--  button --*/}
        <Button text="로그인" _onClick={login}></Button>
        {/* -- 소셜 로그인 -- */}
        <Grid>
          <Text>소셜 계정으로 로그인</Text>
          <Button text="카카오 로그인"></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Login;
