import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, children, margin, width, padding } = props;

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
  position: ${(props) => (props.position ? `${props.position}` : "")};
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default Button;
