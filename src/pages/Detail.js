import React from "react";
import { Grid } from "../elements";

import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.idx;

  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id == id);
  const post_data = post_list[post_idx];

  const [post, setPost] = React.useState(post_data ? post_data : null);

  React.useEffect(() => {
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostDB(id));
    setPost(post);
  }, []);

  return (
    <React.Fragment>
      <Grid>
        {post && (
          <Post
            {...post}
            is_me={post.nickname === user_info?.id}
            detail_view={post_data}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};
export default Detail;
