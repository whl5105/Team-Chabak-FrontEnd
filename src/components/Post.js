import React from "react";
import { Grid, Text, Image, Button } from "../elements";

import { history } from "../redux/configureStore";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Text>부산</Text>
          <Grid is_flex width="5em">
            {props.is_me && (
              <Button width="3em" padding="3px" text="수정"></Button>
            )}
            {props.is_me && (
              <Button
                width="3em"
                margin="0 2px"
                padding="3px"
                text="삭제"
              ></Button>
            )}
          </Grid>
        </Grid>
        <Image
          _onClick={() => {
            history.push("/detail");
          }}
        ></Image>
        <Grid is_flex>
          <Text>ID</Text>
          <Text>댓글 10개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Post;
