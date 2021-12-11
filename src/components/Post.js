import React from "react";
import { Grid, Text, Image, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
  const dispatch = useDispatch();

  const paramIdx = useParams();

  function deletePost(idx) {
    return dispatch(postActions.deletePostDB(idx));
  }
  return (
    <React.Fragment>
      <Grid
        border="1px solid #eeeeee"
        radius="10px"
        bg="#ffffff"
        margin="8px 0"
      >
        <Grid is_flex justify="space-between">
          <Text padding="10px 0 0 10px" bold="800">
            {props.location}
          </Text>
          <Grid is_flex width="13em" justify="flex-end" padding="0 5px 0 0">
            {props.is_me && props.detail_view && (
              <Button
                width="4em"
                padding="3px"
                text="수정"
                _onClick={() => {
                  history.push(`/write/${paramIdx.idx}`);
                }}
              ></Button>
            )}

            {props.is_me && props.detail_view && (
              <Button
                width="4em"
                margin="0 2px"
                padding="3px"
                text="삭제"
                _onClick={() => {
                  deletePost(paramIdx.idx);
                }}
              ></Button>
            )}
          </Grid>
        </Grid>
        {props.detail_view ? (
          <Image src={props.image}></Image>
        ) : (
          <Image state="hover" src={props.image}></Image>
        )}

        <Grid is_flex>
          <Text padding="0 0 0 10px" bold="800">
            {props.nickname}
          </Text>
        </Grid>
        {props.detail_view ? (
          <Text padding="0 0 0 10px" justify="flex-end">
            {props.content}
          </Text>
        ) : (
          ""
        )}
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  nickname: "jay",
  location: "korea",
  content: "Hi",
  image: "https://src.hidoc.co.kr/image/lib/2021/1/20/1611132055778_0.jpg",
};

export default Post;
