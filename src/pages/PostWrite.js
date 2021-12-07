import React from "react";

import Upload from "../shared/Upload";

import {Grid, Input, Button, Text, Image} from '../elements';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const PostWrite = () => {
  const [contents, setContents] = React.useState('');
  const is_edit = false;
  const is_login = false;
  const preview = false;

  const onChange = (e) => {
    setContents(e.target.value);
  }
  const [location, setLocation] = React.useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  if(is_login) {
    return(
      <Grid margin='350px 0'>
        <Text size='20px' center bold>로그인 후 이용할 수 있습니다.</Text>
        <Button text='로그인'></Button>
        <Text size='11px' center color='#999'>
          아직 회원이 아니신가요?&nbsp;&nbsp;&nbsp; <span style={{textDecoration: 'underline',}}>회원가입하기</span>
        </Text>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid padding='0 0 16px'>
          <Text size='36px'>{is_edit? '게시글 등록': '게시글 수정'}</Text>
          <Select
            value={location}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            style={{borderRadius: '0', border: '1px solid #000'}}
          >
            <MenuItem value="">
              <em>지역을 선택하세요.</em>
            </MenuItem>
            <MenuItem value={10}>경기도</MenuItem>
            <MenuItem value={20}>강원도</MenuItem>
            <MenuItem value={30}>충청북도</MenuItem>
            <MenuItem value={30}>충청남도</MenuItem>
            <MenuItem value={30}>경상북도</MenuItem>
            <MenuItem value={30}>경상남도</MenuItem>
            <MenuItem value={30}>전라북도</MenuItem>
            <MenuItem value={30}>전라남도</MenuItem>
          </Select>
        </Grid>

        <Grid padding='0 0 16px'>
          <Upload/>
          <Image src={preview? preview: "http://via.placeholder.com/400x300"}/>
        </Grid>

        <Grid padding='0 0 16px'>
          <Input _onChange={onChange} type='text' value={contents} label='내용' multiLine/>
        </Grid>

        <Grid padding='0 0 16px'>
          {is_edit? 
            <Button text='게시글 등록'></Button>:
            <Button text='게시글 수정'></Button>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;