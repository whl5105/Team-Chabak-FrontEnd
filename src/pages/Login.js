import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { userCreators as userActions } from "../redux/modules/user";
import { Link } from "react-router-dom";

// import { KAKAO_AUTH_URL } from "../shared/OAuth";

const Login = (props) => {
  //카카오
  const REST_API_KEY = "ac0878fc07af105816cf165986308316";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Grid>
        <Text bold size="30px" color="333" center>
          로그인
        </Text>
        {/* -- 아이디 --  */}
        <Grid>
          <Input
            bginput
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
            bginput
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
        <Button text="로그인" _onClick={login} radius="10px"></Button>
        {/* -- 소셜 로그인 -- */}
        <Grid position="relative" margin="50px 0">
          <Text is_sns>소셜 계정으로 로그인</Text>

          {/* <Link href={KAKAO_AUTH_URL}>Kakao Login</Link> */}
          {/* <Button
            radius="10px"
            text="카카오 로그인"
            bgcolor="#fae100"
            color="#786a6a"
            _onClick={() => {
              window.location.href =
                "https://kauth.kakao.com/oauth/authorize?client_id=dcd2dc8ef9a91776b876f76145451b0f&redirect_uri=http://52.78.31.61:8080/oauth/callback/kakao&response_type=code";
            }}
          ></Button> */}
          <Button
            radius="10px"
            text="카카오 로그인"
            bgcolor="#fae100"
            color="#786a6a"
            _onClick={() => {
              window.location.href = { KAKAO_AUTH_URL };
            }}
          ></Button>
          {/* <div
            token={String(process.env.NEXT_PUBLIC_KAKAO_APP_KEY)}
            onSuccess={() => {
              console.log("로그인성공", err);
            }} // 성공 시 실행할 함수
            onFail={(err) => {
              console.log("로그인실패", err);
            }}
            onLogout={() => {
              console.log("로그아웃");
            }}
            render={({ onClick }) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  onClick();
                }}
              >
                카카오로 로그인하기
              </div>
            )}
          ></div> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Login;
