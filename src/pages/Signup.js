import React from "react";
import style from "styled-components";
import { userCreators as userActions } from "../redux/modules/user";
import { Text, Input, Grid, Button } from "../elements";

import { idCheck, emailCheck } from "../shared/regExp";
// redux
import { useDispatch, useSelector } from "react-redux";
// import { style } from "@mui/system";
// import { userCreators } from "../modules/user";

const Signup = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const isLogin = useSelector((store) => store.user.is_login);
  const isIdResponse = useSelector((store) => store.user.response);

  //-- 아아디, 비밀번호, 비밀번호확인 , 이메일  --
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [email, setEmail] = React.useState("");

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = React.useState("");
  const [pwdMessage, setPwdMessage] = React.useState("");
  const [pwdCheckMessage, setPwdCheckMessage] = React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");

  // 유효성 검사
  const [isId, setIsId] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPwdCheck, setIsPwdCheck] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  //---- 아이디 유효성 검사  ----
  const idCheck = (e) => {
    const idCurrent = e.target.value;
    setId(idCurrent);
    if (id.length < 3 || id.length > 10) {
      setIdMessage("3글자 이상 10글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("중복확인이 필요합니다.:)");
      // setIsId(true);
    }
  };
  //---- 아이디 중복  표시  ----
  const isIdCheck = () => {
    if (!isIdResponse) {
      setIdMessage("이미 있는 아이디 입니다.");
      setIsId(false);
    } else {
      setIdMessage("사용할 수 있는 아이디 입니다.");
      setIsId(true);
    }
  };
  //---- 비밀번호 유효성 검사  ----
  const onChangePassword = (e) => {
    // console.log(e.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{3,10}$/;
    const passwordCurrent = e.target.value;
    setPwd(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPwdMessage(
        "숫자+영문자 조합으로 3자리 이상 10자리 이하로 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPwdMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  };
  //---- 비밀번호 중복 확인  ----
  const onChangePasswordCheck = (e) => {
    const pwdCurrent = e.target.value;
    setPwdCheck(pwdCurrent);
    console.log(pwd);
    if (pwd === pwdCurrent) {
      setPwdCheckMessage("비밀번호를 똑같이 입력했어요 : )");
      setIsPwdCheck(true);
    } else {
      setPwdCheckMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
      setIsPwdCheck(false);
    }
  };
  //---- 이메일 유효성 검사  ----
  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  };

  const signUpClick = () => {
    if (!isId || !isPassword || !isPwdCheck || !isEmail) {
      window.alert("아이디, 패스워드, 이메일을 정확아게  입력해주세요");
      return;
    }

    console.log(id, pwd, email);
    dispatch(userActions.signUpDB(id, pwd, email));
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
              _onChange={idCheck}
            ></Input>
            <Button text="중복확인" _onClick={isIdCheck}></Button>
          </Grid>
          {id.length > 0 && <span>{idMessage}</span>}
        </Grid>
        {/* -- 비밀번호 --  */}
        <Grid>
          <Input
            // type="password"
            label="비밀번호"
            placeholder="8~16자 영문 대 소문자, 숫자"
            _onChange={onChangePassword}
          ></Input>

          {pwd.length > 0 && <span>{pwdMessage}</span>}
          <span>{setIdMessage}</span>
        </Grid>
        {/* -- 비밀번호 확인 -- */}
        <Grid>
          <Input
            // type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
            _onChange={onChangePasswordCheck}
          ></Input>
          {pwd_check.length > 0 && <span>{pwdCheckMessage}</span>}
        </Grid>
        {/* -- 이메일 -- */}
        <Grid>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            _onChange={onChangeEmail}
          ></Input>
          {email.length > 0 && <span>{emailMessage}</span>}
        </Grid>

        <Button text="회원가입" _onClick={signUpClick}></Button>
      </Grid>
    </div>
  );
};

export default Signup;
