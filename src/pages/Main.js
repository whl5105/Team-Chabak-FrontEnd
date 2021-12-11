import React from "react";
import { Grid } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import Post from "../components/Post";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostDB());
    }
  }, []);

  return (
    <React.Fragment>
      {/* 목록글 화면에 보여주기 */}
      {post_list.map((p, idx) => {
        // if (p.nickname === user_info?.id) {
        //   return (
        //     <Grid
        //       key={p.id}
        //       _onClick={() => {
        //         history.push(`/detail/${p.id}`);
        //       }}
        //     >
        //       <Post {...p} is_me></Post>
        //     </Grid>
        //   );
        // } else {
        //   return (
        //     <Grid
        //       key={p.id}
        //       _onClick={() => {
        //         history.push(`/detail/${p.id}`);
        //       }}
        //     >
        //       <Post {...p}></Post>
        //     </Grid>
        //   );
        // }
        return(
          <Grid
            key={p.id}
            _onClick={() => {
              history.push(`/detail/${p.id}`);
            }}
          >
            <Post 
              {...p} 
              is_me={p.nickname === user_info?.id ? true : false}
            ></Post>
          </Grid>
        )
      })}
    </React.Fragment>
  );
};

export default Main;
