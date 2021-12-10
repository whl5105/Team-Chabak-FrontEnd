import React from "react";
import { Grid, Text, Image, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
  const dispatch = useDispatch();
  const paramIdx = useParams();
  console.log(paramIdx);
  return (
    <React.Fragment>
      <Grid border="5px solid aliceblue" radius="10px" bg="#ffffff">
        {/* 로그인한 경우 수정과 삭제버튼 보이도록하기 */}
        <Grid is_flex justify="space-between">
          <Text padding="10px 0 0 10px" bold="800">
            {props.location}
          </Text>
          <Grid is_flex width="13em" justify="flex-end" padding="0 5px 0 0">
            {props.is_me && (
              <Button
                width="4em"
                padding="3px"
                text="수정"
                _onClick={() => {
                  history.push(`/write/${paramIdx.idx}`);
                }}
              ></Button>
            )}

            {props.is_me && (
              <Button
                width="4em"
                margin="0 2px"
                padding="3px"
                text="삭제"
                _onClick={() => {
                  dispatch(postActions.deletePostDB(paramIdx.idx));
                }}
              ></Button>
            )}
          </Grid>
        </Grid>
        {/* <Text>{props.content}</Text> */}

        {props.detail_view ? (
          <Image src={props.image}></Image>
        ) : (
          <Image state="hover" src={props.image}></Image>
        )}

        <Grid is_flex>
          <Text padding="0 0 0 10px" bold="800">
            {props.nickname}
          </Text>
          {/* <Text>댓글 10개</Text> */}
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

export default Post;
