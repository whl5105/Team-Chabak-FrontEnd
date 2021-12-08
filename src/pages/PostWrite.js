/* eslint-disable no-use-before-define */
import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Input, Button, Text, Image } from "../elements";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { ActionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const paramIdx = useParams();
  console.log(paramIdx.idx);
  const dispatch = useDispatch();

  const _preview = useSelector(state => state.image.preview);
  const [imageFile, setImageFile] = React.useState(null);
  const fileInput = React.useRef();
  let [nextId, setNextId] = React.useState(4);
  const is_login = useSelector(state => state.user.is_login);
  const post_list = useSelector(state => state.post.list)
  
  const post_id = props.match.params.idx;
  
  const is_edit = post_id ? true : false;
  
  let _post = is_edit ? post_list.find((p) => p.post_id.toString() === post_id) : null;
  const preview = _post ? _post.image_url : '';
 
  const [content, setContents] = React.useState(_post ? _post.content : "");
  const [location, setLocation] = React.useState(_post ? _post.location : "");
  


  const onChange = (e) => {
    setContents(e.target.value);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  // const selectFile = (e) => {
  // console.log(fileInput.current.files[0].name);
  // const reader = new FileReader();
  // const file = fileInput.current.files[0];
  // reader.readAsDataURL(file);
  // // reader.readAsDataURL(e.target.files[0]);
  // // console.log(reader);
  // // console.log(file);
  // console.log(reader);
  // e.preventDefault();
  // const base64 = reader.result;
  // reader.onloadend = () => {
  //무한렌더링...
  // dispatch(imageActions.setPreview(reader.result));
  // console.log("무한렌더링");
  // if (file) {
  //   reader.readAsDataURL(file);
  //   setImageFile(file);
  // }
  // if (base64) {
  //   setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
  // }
  // if (fileInput.current.files[0]) {
  //   reader.readAsDataURL(e.target.files[0]);
  //   setImageFile(e.target.files[0]);
  // }

  //---------------------------------
  /* 이미지 선택 */
  const selectFile = (e) => {

    console.log(fileInput.current.files);

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      if (file) {
        // reader.readAsDataURL(e.target.files[0]);
        setImageFile(file);
        console.log(file);
      }

    };
    console.log(imageFile);
  };
  //---------------------------------
  // };


  const imagFileInfo = imageFile;
  const formData = new FormData();
  // formData.append('img', imagFileInfo)
  // formData.append('img', imagFileInfo.name)
  // console.log(imagFileInfo)
  // console.log(formData) // 다시 확인

  const addPost = () => {
    const formData = new FormData();
    formData.append('img', imageFile);
    dispatch(postActions.addPostDB(content, location, formData, nextId));
    setNextId((nextId += 1));
  };

  const editPost = () => {

    const formData = new FormData();
    formData.append('img', imageFile);
    dispatch(postActions.editPostDB(post_id, {content: content}), location);
  };

  if(!is_login) {
    return(
      <Grid margin='350px 0'>
        <Text size='20px' center bold>로그인 후 이용할 수 있습니다.</Text>
        <Button text='로그인'></Button>
        <Text size='11px' center color='#999'>
          아직 회원이 아니신가요?&nbsp;&nbsp;&nbsp; <span style={{textDecoration: 'underline',}}>회원가입하기</span>

        </Text>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid padding="0 0 16px">
          <Text size="36px">{!is_edit ? "게시글 등록" : "게시글 수정"}</Text>
          <Select
            value={location}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ borderRadius: "0", border: "1px solid #000" }}
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

        <Grid padding='0 0 16px'>
          <input type="file" onChange={selectFile} ref={fileInput}/>
          <Image src={!_preview? preview: "http://via.placeholder.com/400x300"}/>

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

export default PostWrite;
