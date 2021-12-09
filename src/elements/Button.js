import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    children,
    margin,
    width,
    padding,
    text_color,
    disabled,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    disabled: disabled,
  };
  if (text_color) {
    return (
      <React.Fragment>
        <ElButton {...styles} onClick={_onClick}>
          {text ? text : children}
        </ElButton>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <RoundButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </RoundButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text_color: false,
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  disabled: false,
};
//---- 기본 return Button ----
const ElButton = styled.button`
  width: ${(props) => props.width};
  font-weight: 800;
  background: none;
  /* background-color: red; */
  color: #fff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  position: ${(props) => (props.position ? `${props.position}` : "")};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const RoundButton = styled.button`
  width: ${(props) => props.width};
  font-weight: 800;
  background-color: #3974d9;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  position: ${(props) => (props.position ? `${props.position}` : "")};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default Button;
