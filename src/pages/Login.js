import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch } from "react-redux";
import { userCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();
  //---- 아이디 비밀번호 ----
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  //---- 오류메시지 상태저장 ----
  const [Message, setMessage] = React.useState("");

  //---- 유효성 검사 ----
  const [isState, setIsState] = React.useState(false);

  const login = () => {
    if (id.length < 3 || id.length > 10 || pwd.length < 3 || pwd.length > 10) {
      setMessage("아이디 비밀번호 길이가 맞지 않습니다.");
      setIsState(false);
    } else {
      setMessage("길이 확인 성공 ");
      setIsState(true);
      dispatch(userActions.loginDB(id, pwd));
    }
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
        {id.length > 0 && <span>{Message}</span>}
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
