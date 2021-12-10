/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
import React from "react";
import styled from "styled-components";
import { Grid, Input, Button, Text, Image } from "../elements";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { ActionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const [imageFile, setImageFile] = React.useState(null);
  const fileInput = React.useRef();
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  const { history } = props;
  // console.log(post_list)

  let post_id = props.match.params.idx;

  const is_edit = post_id ? true : false;
  // console.log(is_edit);

  let _post = is_edit
    ? post_list.find((p) => p.id === Number(post_id))
    : null;
  // console.log(_post);

  const [content, setContents] = React.useState(_post ? _post.content : "");
  const [location, setLocation] = React.useState(_post ? _post.location : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image));
    }
  }, []);

  const onChange = (e) => {
    setContents(e.target.value);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  /* 이미지 선택 */
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      if (file) {
        setImageFile(file);
      }
    };
  };

  const addPost = () => {
    let addFormData = new FormData();

    const post_info = {
      location: location,
      content: content,
    };

    addFormData.append("multipartFile", imageFile);
    addFormData.append(
      "data",
      new Blob([JSON.stringify(post_info)], { type: "application/json" })
    );

    dispatch(postActions.addPostDB(location, content, addFormData));
  };

  const editPost = () => {
    const editFormData = new FormData();
    editFormData.append("img", imageFile);
    // console.log(editFormData.get('img'));
    const post_info = {
      location: location,
      content: content,
    };

    editFormData.append("multipartFile", imageFile);
    editFormData.append(
      "data",
      new Blob([JSON.stringify(post_info)], { type: "application/json" })
    );

    dispatch(
      postActions.editPostDB(
        post_id,
        { content: content },
        { location: location },
        editFormData
      )
    );
  };

  if (!is_login) {
    return (
      <Grid margin="350px 0">
        <Text size="20px" center bold>
          로그인 후 이용할 수 있습니다.
        </Text>
        <Button text="로그인"></Button>
        <Text size="11px" center color="#999">
          아직 회원이 아니신가요?&nbsp;&nbsp;&nbsp;{" "}
          <span style={{ textDecoration: "underline" }}>회원가입하기</span>
        </Text>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid padding="0 0 16px">
          <Text size="36px" bold center="center">
            {!is_edit ? "게시글 등록" : "게시글 수정"}
          </Text>
          <Select
            value={location}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{
              width: "100%",
              borderRadius: "5px",
              color: "#555",
              height: "40px",
            }}
          >
            <MenuItem value="">
              <em>지역을 선택하세요.</em>
            </MenuItem>
            <MenuItem value={"경기도"}>경기도</MenuItem>
            <MenuItem value={"강원도"}>강원도</MenuItem>
            <MenuItem value={"충청북도"}>충청북도</MenuItem>
            <MenuItem value={"충청남도"}>충청남도</MenuItem>
            <MenuItem value={"경상북도"}>경상북도</MenuItem>
            <MenuItem value={"경상남도"}>경상남도</MenuItem>
            <MenuItem value={"전라북도"}>전라북도</MenuItem>
            <MenuItem value={"전라남도"}>전라남도</MenuItem>
          </Select>
        </Grid>

        <Grid padding="0 0 16px">
          <Filebox>
            <InputFile value="첨부파일" placeholder="첨부파일" />
            <InputLabel for="file">파일찾기</InputLabel>
            <input
              type="file"
              id="file"
              onChange={selectFile}
              ref={fileInput}
            />
            {/* <InputFile /> */}
          </Filebox>

          <Image
            src={preview ? preview : "http://via.placeholder.com/400x300"}
          />
        </Grid>

        <Grid padding="0 0 16px">
          <Input
            _onChange={onChange}
            type="text"
            value={content}
            label="내용"
            multiLine
          />
        </Grid>

        <Grid padding="0 0 16px">
          {!is_edit ? (
            <Button text="게시글 등록" _onClick={addPost}></Button>
          ) : (
            <Button text="게시글 수정" _onClick={editPost}></Button>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
const InputFile = styled.input`
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 78%;
  color: #999;
`;
const InputLabel = styled.label`
  display: inline-block;
  padding: 10px 8px;
  color: #fff;
  vertical-align: middle;
  background-color: #c4c4c4;
  cursor: pointer;
  margin-left: 7px;
  border-radius: 5px;
`;
const Filebox = styled.div`
  margin: 10px 0;
  overflow: hidden;
  & input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;
export default PostWrite;
