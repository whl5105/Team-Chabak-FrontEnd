import React from "react";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { userCreators as userActions } from "../redux/modules/user";
import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";

import api from "../api/posts";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  const post_num = useSelector((state) => state.post.pageNum);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  //리덕스 관리
  // console.log(post_list[0]);

  console.log(post_list);
  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostDB());
      dispatch(userActions.loginCheckDB());
    }
  }, []);
  return (
    <React.Fragment>
      {/* <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostDB(post_num + 1));
        }}
        // is_next={paging.next ? true : false}
        // loading={is_loading}
      > */}
      

      {/* 목록글 화면에 보여주기 */}
      {post_list.map((p, idx) => {
        if (p.nickname) {
          return (
            <Grid
              key={p}
              _onClick={() => {
                history.push(`/detail/${p.id}`);
              }}
            >
              <Post
                {...p}
                is_me={post_list[idx].nickname === user_info?.id}
              ></Post>
            </Grid>
          );
        } else {
          return (
            <Grid
              key={p}
              _onClick={() => {
                history.push(`/detail/${p.id}`);
              }}
            >
              <Post
                {...p}
                is_me={post_list[idx].nickname === user_info?.id}
              ></Post>
            </Grid>
          );
        }
      })}
      {/* </InfinityScroll> */}
    </React.Fragment>
  );
};

export default Main;
