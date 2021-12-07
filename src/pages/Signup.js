import React from "react";
import { Text, Input, Grid, Button } from "../elements";

import { idCheck, emailCheck } from "../shared/regExp";

// redux
import { useDispatch, useSelector } from "react-redux";
// import { userCreators } from "../modules/user";

const Signup = (props) => {
  const { history } = props;
  const isLogin = useSelector((store) => store.user.is_login);
  //-- 아아디, 비밀번호, 비밀번호확인 , 이메일  --
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [email, setEmail] = React.useState("");

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = React.useState("");
  const [pwdMessage, setPwdMessage] = React.useState("");

  // 유효성 검사
  const [isName, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const signUpClick = () => {
    history.push("/");
  };
  return (
    <div>
      <Grid>
        <Text bold size="30px" color="333">
          회원가입
        </Text>
        {/* -- 아이디 --  */}
        <Grid>
          <Grid is_flex>
            <Input
              label="아이디"
              placeholder="3~10자로 입력해주세요."
              _onChange={(e) => {
                setId(e.target.value);
              }}
            ></Input>
            <Button
              text="중복확인"
              _onClick={() => {
                // onClickId;
              }}
            ></Button>
          </Grid>
          <span>{id.length > 0 ? `${idMessage}` : null}</span>
        </Grid>
        {/* -- 비밀번호 --  */}
        <Grid>
          <Input
            // type="password"
            label="비밀번호"
            placeholder="8~16자 영문 대 소문자, 숫자"
            _onChange={(e) => {
              // onChangePwd(e);
            }}
          ></Input>
          {pwd.length > 0 ? `${pwdMessage}` : null}
          <span>유효성</span>
        </Grid>
        {/* -- 비밀번호 확인 -- */}
        <Grid>
          <Input
            // type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          ></Input>
          <span>유효성</span>
        </Grid>
        {/* -- 이메일 -- */}
        <Grid>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            _onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <span>유효성</span>
        </Grid>

        <Button text="회원가입" _onClick={signUpClick}></Button>
      </Grid>
    </div>
  );
};

export default Signup;
