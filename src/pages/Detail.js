import React from "react";
import { Grid } from "../elements";

import Post from "../components/Post";
import { useSelector } from "react-redux";

const Detail = (props) => {
  const id = props.match.params.id;

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post_data = post_list[post_idx];

  const [post, setPost] = React.useState(post_data ? post_data : null);
  console.log(post)
  return (
    <React.Fragment>
      <Grid>
        {post && <Post {...post} is_me={post.nickname === user_info?.uid} />}
      </Grid>
    </React.Fragment>
  );
};
export default Detail;
