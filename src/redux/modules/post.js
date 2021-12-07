import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/Api";
import "moment";

// ---- actions type ----
const GET_POST = "GET_POST";
const LOADING = "LOADING";
// const DELETE_POST = "DELETE_POST";

// ---- action creators ----
const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

// ---- initialState ----
const initialState = {
  list: [
    {
      location: "화성",
      content: "넘모 좋아요",
      image: "이미지URL",
      nickname: "김차박", 
      createdAt: "2021-12-06",
    },
    {
      location: "화성1",
      content: "넘모오 좋아요",
      image: "이미지URL",
      nickname: "김차박1", 
      createdAt: "2021-12-06",
      
    },
    {
      location: "화성2",
      content: "넘모오오 좋아요",
      image: "이미지URL",
      nickname: "김차박2", 
      createdAt: "2021-12-06",
      
    },
  ],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  image_url: "",
  contents: "",
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

//---- reducer ----
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
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
  deletePostDB,
};

export { actionCreators };
