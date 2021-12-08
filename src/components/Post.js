import React from "react";
import { Grid, Text, Image, Button } from "../elements";

import { history } from "../redux/configureStore";

const Post = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Text>{props.location}</Text>
          <Grid is_flex width="13em">
            <Text>{props.createdAt}</Text>
            {props.is_me && (
              <Button width="4em" padding="3px" text="수정"></Button>
            )}
            {props.is_me && (
              <Button 
                width="4em"
                margin="0 2px"
                padding="3px"
                text="삭제"
              ></Button>
            )}
          </Grid>
        </Grid>
        <Text>{props.content}</Text>
        <Image
          src={props.image}
          _onClick={() => {
            history.push(`/detail/${props.idx}`);
          }}
        ></Image>
        <Grid is_flex>
          <Text>{props.nickname}</Text>
          {/* <Text>댓글 10개</Text> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Post;
