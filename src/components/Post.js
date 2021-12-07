import React from "react";
import { Grid, Text, Image, Button } from "../elements";

const Post = () => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Text>부산</Text>
          <Grid is_flex width="5em">
            <Button width="3em" padding="3px" text="수정"></Button>
            <Button
              width="3em"
              margin="0 2px"
              padding="3px"
              text="삭제"
            ></Button>
          </Grid>
        </Grid>
        <Image></Image>
        <Grid is_flex>
          <Text>ID</Text>
          <Text>댓글 10개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Post;
