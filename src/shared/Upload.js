import React from "react";

import { useDispatch } from "react-redux";
import { ActionCreators as imageActions } from "../redux/modules/image";

const Upload = () => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();

// FileReader
  const onChange = (e) => {
    console.log(fileInput.current.files[0]);
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader, file);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  
  return (
    <React.Fragment>
      <input type='file' ref={fileInput} onChange={onChange}/>
    </React.Fragment>
  )
};

export default Upload