import React from "react";
import styled from "styled-components";
const Text = (props) => {
  const { bold, color, size, margin, children, center, is_text, __onClick } =
    props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    center: center,
    is_text: is_text,
    __onClick: __onClick,
  };

  if (is_text) {
    return <Div onClick={__onClick}>Chabak</Div>;
  }

  return (
    <React.Fragment>
      <P {...styles}>{children}</P>
    </React.Fragment>
  );
};

Text.defalutProps = {
  blod: false,
  color: "#222831",
  size: "14px",
  margin: false,
  center: false,
  is_text: false,
  __onClick: () => {},
};
const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  ${(props) => (props.center ? "text-align: center" : "")};
`;

const Div = styled.div`
  font-size: 2em;
  font-weight: 800;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
export default Text;
