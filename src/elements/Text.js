import React from "react";
import styled from "styled-components";
const Text = (props) => {
  const { bold, color, size, margin, children, center } = props;

  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    center: center,
  };
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
};
const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  ${(props) => (props.margin ? `margin:${props.margin};` : "")};
  ${(props) => (props.center)? 'text-align: center': '' };
`;
export default Text;
