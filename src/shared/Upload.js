// import React from "react";

// import { useDispatch } from "react-redux";
// import { ActionCreators as postActions } from "../redux/modules/image";

// const Upload = () => {
//   const dispatch = useDispatch();
//   const fileInput = React.useRef();

// // FileReader
//   const onChange = (e) => {
//     console.log(fileInput.current.files[0]);
//     const reader = new FileReader();
//     const file = fileInput.current.files[0];

//     // const formData = new FormData();
//     // formData.append('files', file);
//     // formData.append('files_name', file.name);

//     // console.log(formData);

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       dispatch(imageActions.setPreview(reader.result));
//     };
    
//     e.preventDefault();
  
//     // if(e.target.files){
      
//     // }

//     dispatch()
//   };

  
//   return (
//     <React.Fragment>
//       <input type='file' />
//       <form>
//         <label htmlFor="profile-upload" />
//         <input type="file" accept="image/*" ref={fileInput} onChange={onChange}/>
//       </form>
//     </React.Fragment>
//   )
// };

// export default Upload