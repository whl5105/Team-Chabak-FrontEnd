import React from "react";
import styled from "styled-components";

import { Text, Grid } from ".";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, value, bginput } =
    props;

  // ---- 글쓰기 페이지 내용 영역 ----
  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElTextarea
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  // ---- 로그인 회원가입  ----
  if (bginput) {
    return (
      <Grid>
        <Text margin="0px" size="16px" bold color="#333">
          {label}
        </Text>
        <Underline type={type} placeholder={placeholder} onChange={_onChange} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <Text margin="0px" size="14px">
          {label}
        </Text>
        <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: "텍스트",
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
  checked: "",
  // input label에 size 추가
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;
//---- 로그인 회원가입 언더라인 ----
const Underline = styled.input`
  border: none;
  width: 100%;
  margin: 4px 0 11px 0;
  background: #eee;
  padding: 12px;
  border-radius: 5px;
  box-sizing: border-box;
`;
export default Input;
