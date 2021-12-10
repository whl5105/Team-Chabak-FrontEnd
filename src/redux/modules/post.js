import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import "moment";

import { ActionCreators as imageActions } from "./image";
import { Sync } from "@mui/icons-material";
import { findIndex } from "lodash";

import axios from "axios";

// ---- actions type ----
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
// const DELETE_POST = "DELETE_POST";

// ---- action creators ----
const getPost = createAction(GET_POST, (post_list) => ({
  post_list,
}));

const addPost = createAction(ADD_POST, (post) => ({
  post,
}));

const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

// ---- initialState ----
const initialState = {
  list: [
    // {
    //   id: 0,
    //   location: "경기도",
    //   content: "넘모 좋아요",
    //   image: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
    //   nickname: "김차박",
    //   createdAt: "2021-12-06",
    // },
    // {
    //   id: 1,
    //   location: "화성1",
    //   content: "넘모오 좋아요",
    //   image: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
    //   nickname: "김차박1",
    //   createdAt: "2021-12-06",
    // },
    // {
    //   id: 2,
    //   location: "화성2",
    //   content: "넘모오오 좋아요",
    //   image: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
    //   nickname: "김차박2",
    //   createdAt: "2021-12-06",
    // },
  ],

  // paging: { start: null, next: null, size: 3 },
  // is_loading: false,
  pageNum: 0,
};

const initialPost = {
  id: 1,
  location: "",
  image: null,
  content: "",
  nickname: "",
};

// ---- middleware actions ----
// const fatchPosts = async (dispatch, getState) => {
//   try {
//     const response = await api.get("/list");
//     // console.log(response);
//     // console.log(response.data);
//     const post_list = response.data;
//     dispatch(getPost(post_list));
//     // setPosts(response.data);
//     // console.log(posts);
//   } catch (err) {
//     // if (err.response) {
//     //   //Not in the 200 response range
//     //   console.log(err.response.data);
//     //   console.log(err.response.status);
//     //   console.log(err.response.headers);
//     // } else {
//     //   console.log(`Error:${err.response.data}`);
//     // }
//   }
// };

//-- getPostDB(DB 데이터 가져오기) --

// 목록 불러오기
export const getPostDB =
  (pageNum) =>
  async (dispatch, getState, { history }) => {
    try {
      console.log("목록 불러오기 성공");
      const postlist = await apis.boards(pageNum);
      // console.log(postlist);
      dispatch(getPost(postlist.data));
    } catch (err) {
      console.log(`boards 조회 오류 발생!${err}`);
    }
  };

// 목록 하나만 부르기
export const getOnePostDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      console.log("목록 불러오기 성공");
      const postlist = await apis.board(id);

      console.log(postlist);
      dispatch(getPost(postlist.data));
    } catch (err) {
      console.log(`board 조회 오류 발생!${err}`);
    }
  };

//-- deletePostFB(post 삭제)  --
export const deletePostDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      await apis.del(id);
      history.replace("/");
    } catch (err) {
      console.error("Error removing document: ", err);
    }
  };

//-- addPostDB --
export const addPostDB =
  (_location, _content, formData) =>
  async (dispatch, getState, { history }) => {
    try {
      const user_id = getState().user.nickname;
      const image_url = getState().image.preview;

      const accessToken = document.cookie.split("=")[1];

      const _post = {
        ...initialPost,
        content: _content,
        location: _location,
        nickname: user_id,
        image: image_url,
      };

      axios({
        method: "post",
        url: "http://52.78.31.61:8080/api/board",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-AUTH-TOKEN": `${accessToken}`, 
        },
      })
      .then((response) => {
        window.alert("게시물 업로드 완료");
        dispatch(addPost(_post));
        history.replace("/");
        console.log(response);
      })
      .catch((err) => {
        window.alert("게시물 업로드 실패");
        console.log(err)
      });

      

      dispatch(imageActions.setPreview(null));
    } catch (err) {
      console.error("게시물 업로드 문제 발생", err);
    }
  };

//-- editPostDB --
export const editPostDB =
  (post_id = null, content = {}, location, formData) =>
  async (dispatch, getState, { history }) => {
    try {
      if (!post_id) {
        console.log("게시물 정보가 없어요!");
        return;
      }
      console.log(post_id);
      const image_url = getState().image.preview;

      const accessToken = document.cookie.split("=")[1];
      
      axios({
        method: "put",
        url: `http://52.78.31.61:8080/api/board/detail/${post_id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-AUTH-TOKEN": `${accessToken}`, 
        },
      })
      .then((response) => {
        window.alert("게시물 수정 완료");
        console.log(response);
      })
      .catch((err) => {
        window.alert("게시물 수정 실패");
        console.log(err)
      });
      
    
      dispatch(
        editPost(post_id, { ...content, ...location, image_url: image_url })
      );

      // history.replace("/");
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      window.alert("이미지를 선택해주세요");
      console.log(err);
    }
  };

// //상세게시물 요청  DB
// export const getOnePostDB =
//   (id) =>
//   async (dispatch, getState, { history }) => {
//     try {
//       // dispatch(loading(true));
//       console.log("목록 불러오기 성공");
//       const postOne = await apis.board(id);
//       console.log(postOne);
//       // dispatch(getPost(postlist.data));
//     } catch (err) {
//       console.log(`boards 조회 오류 발생!${err}`);
//     }
//   };

// const getOnePostDB = (id) => {
//   return function (didispatch, getState, { history }) {
//     const postDB = firestore.collection("post");
//     postDB
//       .doc(id)
//       .get()
//       .then((doc) => {
//         console.log(doc);
//         console.log(doc.data());

//         let _post = doc.data();
//         let post = Object.keys(_post).reduce(
//           (acc, cur) => {
//             if (cur.indexOf("user_") !== -1) {
//               return {
//                 ...acc,
//                 user_info: { ...acc.user_info, [cur]: _post[cur] },
//               };
//             }
//             return { ...acc, [cur]: _post[cur] };
//           },
//           { id: doc.id, user_info: {} }
//         );
//         dispatch(getPost([post]));
//       });
//   };
// };

//---- reducer ----
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        // 중복 처리하기
        // draft.list = draft.list.reduce((acc, cur) => {
        //   if (acc.findIndex((a) => a.id === cur.id) === -1) {
        //     return [...acc, cur];
        //   }else{
        //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //     return acc;
        //   }
        // });
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p.id === Number(action.payload.post_id)
        );

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    // [DELETE_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
    //     draft.list.splice(idx, 1);
    //   }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostDB,
  getOnePostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
  // getOnePostDB,
  // fatchPosts,
};

export { actionCreators };
