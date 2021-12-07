import React from "react";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    dispatch(postActions.getPostFB);
  }, []);

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        if (p.user_info.user_id) {
          return (
            <Grid>
              <Post is_me></Post>
            </Grid>
          );
        } else {
          return (
            <Grid>
              <Post></Post>
            </Grid>
          );
        }
      })}
    </React.Fragment>
  );
};

export default Main;
