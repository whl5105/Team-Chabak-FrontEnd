import React from "react";

import { Grid, Input, Button } from "../elements";

const CommentWrite = () => {
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          bginput
          placeholder="댓글 내용을 입력해주세요 :)"
          label="댓글 작성"
        />
        <Button width="50px" margin="0px 2px 0px 2px">
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
