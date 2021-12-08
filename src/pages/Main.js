import React from "react";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user);
  console.log(post_list);
  React.useEffect(() => {
    dispatch(postActions.getPostDB);
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        if (p.nickname) {
          return (
            <Grid key={idx}>
              <Post {...p} idx={idx} is_me></Post>
            </Grid>
          );
        } else {
          return (
            <Grid key={idx}>
              <Post {...p} idx={idx}></Post>
            </Grid>
          );
        }
      })}
    </React.Fragment>
  );
};

export default Main;
