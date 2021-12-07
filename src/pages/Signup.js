import React from "react";
import { Text, Input, Grid, Button } from "../elements";

const Signup = (props) => {
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

  // // 아이디
  // function onChangeId(e) {
  //   setId(e.target.value);
  //   if (e.target.value.length < 3 || e.target.value.length > 10) {
  //     setIdMessage("3글자 이상 10글자 미만으로 입력해주세요.");
  //     setIsName(false);
  //   } else {
  //     setIdMessage("올바른 이름 형식입니다 :)");
  //     setIsName(true);
  //   }
  // }
  // 아이디 클릭
  function onClickId(e) {
    console.log(e.target.value);
    setId(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setIdMessage("3글자 이상 10글자 미만으로 입력해주세요.");
      console.log("false");
      setIsName(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      console.log("true");
      setIsName(true);
    }
  }
  // console.log(id);
  // 비밀번호
  function onChangePwd(e) {
    // setPwd(e.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    const passwordCurrent = e.target.value;

    setPwd(passwordCurrent);
    // console.log(passwordRegex.test(passwordCurrent));
    if (!passwordRegex.test(passwordCurrent)) {
      setPwdMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPwdMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }

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
              // _onChange={(e) => {
              //   setId(e.target.value);
              // }}
            ></Input>
            <Button
              text="중복확인"
              _onClick={(e) => {
                onClickId(e);
              }}
            ></Button>
          </Grid>

          {id.length > 0 ? `${idMessage}` : null}

          <span>유효성</span>
        </Grid>
        {/* -- 비밀번호 --  */}
        <Grid>
          <Input
            type="password"
            label="비밀번호"
            placeholder="8~16자 영문 대 소문자, 숫자"
            _onChange={(e) => {
              onChangePwd(e);
            }}
          ></Input>
          {pwd.length > 0 ? `${pwdMessage}` : null}
          <span>유효성</span>
        </Grid>
        {/* -- 비밀번호 확인 -- */}
        <Grid>
          <Input
            type="password"
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

        <Button text="회원가입"></Button>
        <Grid>
          <Text>
            이미계정이 있으신가요?
            <span>로그인</span>
          </Text>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
