import React from "react";

import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    padding,
    margin,
    bg,
    center,
    children,
    _onClick,
    position,
    justify,
    height,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    position: position,
    justify: justify,
    height: height,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  position: false,
  justify: false,
  height: false,
};

const GridBox = styled.div`
  max-width: 500px;
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? "display: flex; align-items: center;" : "")}
  ${(props) => (props.position ? `position: ${props.position};` : "")}
`;
export default Grid;
