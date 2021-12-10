import React from "react";
import { Grid, Text, Image, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  actionCreators as postActions,
  deletePostDB,
} from "../redux/modules/post";

const Post = (props) => {
  const dispatch = useDispatch();
  //메인에서 반복문으로 돌린 게시물 인덱스번호 가지고 오기위해 사용
  const paramIdx = useParams();

  function deletePost(idx) {
    return (
      dispatch(postActions.deletePostDB(idx)), dispatch(postActions.getPostDB())
    );
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
            {/* 로그인한 경우 (수정,삭제버튼) 보이도록하기 */}
            {/* is_me = 로그인한경우 */}

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
        {/* detail_view = 메인과 상세보기페이지 차이점을 주기위해 상세페이지인 경우에만 적용되는 변수로 사용*/}
        {/* 3항 연산식으로 메인과 상세페이지로 보여질 부분을 나눔 */}
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
