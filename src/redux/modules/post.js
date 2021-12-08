import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import "moment";

import { ActionCreators as imageActions } from "./image";
import { Sync } from "@mui/icons-material";

// ---- actions type ----
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
// const DELETE_POST = "DELETE_POST";

// ---- action creators ----
const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({
  post
}));
const editPost = createAction(EDIT_POST, (id, post) => ({
  id, post
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

// ---- initialState ----
const initialState = {
  list: [
    {
      id: 1,
      location: "화성",
      content: "넘모 좋아요",
      image_url: "이미지URL",
      nickname: "김차박", 
      createdAt: "2021-12-06",
    },
    {
      id: 2,
      location: "화성1",
      content: "넘모오 좋아요",
      image_url: "이미지URL",
      nickname: "김차박1", 
      createdAt: "2021-12-06",
      
    },
    {
      id: 3,
      location: "화성2",
      content: "넘모오오 좋아요",
      image_url: "이미지URL",
      nickname: "김차박2", 
      createdAt: "2021-12-06",
    },
  ],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  id: "",
  location: "",
  image_url: null,
  content: "",
  nickname: "",
};

// ---- middleware actions ----
//-- getPostDB(DB 데이터 가져오기) --

//로드
export const getPostDB =
  () =>
  async (dispatch, getState, { history }) => {
    try { 
      const { post_list } = await apis.boards();
      dispatch(getPost(post_list));
    } catch (err) {
      console.log(`boards 조회 오류 발생!${err}`);
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
  (_content, _location, formData, id) =>
  async (dispatch, getState, { history }) => {
    try {
      const user_id = getState().user.nickname;
      const image_url = getState().image.preview;
      const multipartFile = formData

      const _post = {
        ...initialPost,
        id: id,
        content: _content,
        location: _location,
        nickname: user_id,
        image_url: image_url,
      };
      console.log(_post);
      const {content, location, nickname} = _post;

      // await apis.add(location, content, multipartFile, nickname);
      console.log('요청성공')
      
      dispatch(addPost(_post));

      // history.push('/');
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      console.error("게시물 업로드 문제 발생", err);
    };
  };

//-- editPostDB --
export const editPostDB = 
  (post_id=null, post={}, formData) => 
  async (dispatch, getState, {history}) => {
    try {
      if(!post_id) {
        console.log('게시물 정보가 없어요!');
        return;
      }
      
      // const post_list = getState().post
      const image_url = getState().image.preview;

      


      
    } catch (err) {
      console.log()
    };
  }


//---- reducer ----
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) => 
      produce(state, (draft) => {
        console.log('editPost:', action.payload.id);
        let idx = draft.list.findIndex(p => p.id === action.payload.id)
        
        draft.list[idx] = {...draft.list, ...action.payload.post}
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
  addPostDB,
  editPostDB,
  deletePostDB,
};

export { actionCreators };
