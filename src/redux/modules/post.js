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
  post,
}));
const editPost = createAction(EDIT_POST, (id, post) => ({
  id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

// ---- initialState ----
const initialState = {
  list: [
    // {
    //   post_id: 0,
    //   location: "경기도",
    //   content: "넘모 좋아요",
    //   image_url: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
    //   nickname: "김차박",
    //   createdAt: "2021-12-06",
    // },
    // {
    //   post_id: 1,
    //   location: "화성1",
    //   content: "넘모오 좋아요",
    //   image_url: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
    //   nickname: "김차박1",
    //   createdAt: "2021-12-06",
    // },
    // {
    //   post_id: 2,
    //   location: "화성2",
    //   content: "넘모오오 좋아요",
    //   image_url: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/13/109219735.1.jpg",
    //   nickname: "김차박2",
    //   createdAt: "2021-12-06",
    // },
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
  (_content, _location, formData, post_id) =>
  async (dispatch, getState, { history }) => {
    try {
      const user_id = getState().user.nickname;
      const image_url = getState().image.preview;
      const multipartFile = formData;
      console.log(multipartFile);

      const _post = {
        ...initialPost,
        post_id: post_id,
        content: _content,
        location: _location,
        nickname: user_id,
        image_url: image_url,
      };
      console.log(_post);
      const { content, location, nickname } = _post;

      // await apis.add(location, content, multipartFile, nickname);

      dispatch(addPost(_post));

      history.push("/");
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      console.error("게시물 업로드 문제 발생", err);
    }
  };

//-- editPostDB --
export const editPostDB =
  (id = null, content = {}, location, formData) =>
  async (dispatch, getState, { history }) => {
    try {
      if (!id) {
        console.log("게시물 정보가 없어요!");
        return;
      }

      const multipartFile = formData;
      const image_url = getState().image.preview;

      const post_idx = getState().post.list.findIndex(
        (p) => p.post_id === Number(id)
      );
      const post = getState().post.list[post_idx];
      if (image_url === post.image_url && location === post.location) {
        // await apis.add(post.location, content, post_id);
        console.log("if 1");
        dispatch(editPost(id, { ...content }));
      } else {
        // await apis.eidt(post.location, content, multipartFile, post_id)
        dispatch(
          editPost(id, { ...content, image_url: image_url, location: location })
        );
        console.log("if 2");
      }

      history.replace("/");
      dispatch(imageActions.setPreview(null));
    } catch (err) {
      window.alert("이미지를 선택해주세요");
      console.log(err);
    }
  };

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
        let idx = draft.list.findIndex(
          (p) => p.id === Number(action.payload.id)
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
  addPostDB,
  editPostDB,
  deletePostDB,
};

export { actionCreators };
