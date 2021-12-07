import React from "react";

const Upload = () => {
  const fileInput = React.useRef();

  const onChange = (e) => {
    console.log(fileInput.current.files[0])

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
    }
  }

  
  return (
    <React.Fragment>
      <input type='file' ref={fileInput} onChange={onChange}/>
    </React.Fragment>
  )
}

export default Upload