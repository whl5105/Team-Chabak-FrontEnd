import React from "react";
import { Grid } from "../elements";

import Post from "../components/Post";
import { useSelector } from "react-redux";

const Detail = (props) => {
  const id = props.match.params.idx;

  const user_info = useSelector((state) => state.user.user);
  console.log(user_info.id);
  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id == id);
  const post_data = post_list[post_idx];

  const [post, setPost] = React.useState(post_data ? post_data : null);
  // const is_me = post.nickname === user_info?.id ? true : false;
  // console.log(is_me);
  console.log(post.nickname);
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
