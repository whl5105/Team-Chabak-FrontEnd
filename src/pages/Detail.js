import React, { useEffect } from "react";
import { Grid } from "../elements";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { apis } from "../shared/Api";

import axios from "axios";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.idx;

  const user_info = useSelector((state) => state.user);

  const post_list = useSelector((store) => store.post.list);
  const post_idx = post_list.findIndex((p) => p.id == id);
  const post_data = post_list[post_idx];
  const [post, setPost] = React.useState(post_data ? post_data : null);

  React.useEffect(() => {
    const accessToken = document.cookie.split("=")[1];

    axios({
      method: "get",
      url: `http://52.78.31.61:8080/api/board/detail/${id}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-AUTH-TOKEN": `${accessToken}`,
      },
    })
    .then((res) => {
      setPost(res.data);
      console.log('요청성공', res.data);
      console.log(post);
      console.log(post.nickname);
      console.log(user_info.nickname);
    })
    .catch((err) => {
      console.log('실패', err);
    });
  }, []);


  return (
    <React.Fragment>
      <Grid>
        {post && (
          <Post
            {...post}

            is_me={post.nickname === user_info?.nickname.id}

            detail_view={post_data}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};
export default Detail;
