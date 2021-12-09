import React from "react";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";

import api from "../api/posts";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const post_num = useSelector((state) => state.post.pageNum);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  //리덕스 관리
  // console.log(post_list[0]);

  console.log(post_list);
  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostDB());
    }
  }, []);
  console.log(props);
  return (
    <React.Fragment>
      {/* <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostDB());
        }}
        // is_next={paging.next ? true : false}
        // loading={is_loading}
      > */}
      {post_list.map((p, idx) => {
        if (p.nickname) {
          return (
            <Grid
              key={idx}
              _onClick={() => {
                history.push(`/detail/${idx}`);
              }}
            >
              <Post {...p} is_me></Post>
            </Grid>
          );
        } else {
          return (
            <Grid
              key={idx}
              _onClick={() => {
                history.push(`/detail/${idx}`);
              }}
            >
              <Post {...p}></Post>
            </Grid>
          );
        }
      })}
      {/* </InfinityScroll> */}
    </React.Fragment>
  );
};

export default Main;
