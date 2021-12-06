import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  //---- 게시글 추가 버튼 ----
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};
//---- 기본 return Button ----
const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #333;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
`;

//---- 게시글 추가 버튼 ----
const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #333;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
