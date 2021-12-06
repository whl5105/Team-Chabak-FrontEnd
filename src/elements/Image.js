import React from "react";

import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return <React.Fragment></React.Fragment>;
};
Image.defaultProps = {
  shape: "rectangle",
  src: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
  size: 36,
};
const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%; // 이미지가 가로넓이의 4:3비율을 맞추기위해 75% 적용
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

export default Image;
