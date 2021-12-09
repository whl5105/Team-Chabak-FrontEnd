import React from "react";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";

import api from "../api/posts";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user);

  // console.log(post_list[0]);

  console.log(post_list);
  React.useEffect(() => {
    dispatch(postActions.getPostDB);
    // dispatch(postActions.fatchPosts);
  }, []);
  console.log(props);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Main;
