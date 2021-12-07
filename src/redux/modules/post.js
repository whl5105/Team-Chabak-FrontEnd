import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";

const SET_POST = "SET_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  image_url: "",
  contents: "",
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    // const postDB = firestore.collection("post");

    // let query = postDB.orderBy("insert_dt", "desc");

    // if(start){
    //   query = query.startAt(start);
    // }

    // query
    //   .limit(size+1)
    //   .get()
    //   .then(docs => {
    //   let post_list = [];

    //   let paging = {
    //     start: docs.docs[0],
    //     next: docs.docs.length === size+1? docs.docs[docs.docs.length-1] : null,
    //     size: size,
    //   }

    // docs.forEach((doc) => {
    //   let _post = doc.data();

    // ['commenct_cnt', 'contents', ..]
    //     let post = Object.keys(_post).reduce(
    //       (acc, cur) => {
    //         if (cur.indexOf("user_") !== -1) {
    //           return {
    //             ...acc,
    //             user_info: { ...acc.user_info, [cur]: _post[cur] },
    //           };
    //         }
    //         return { ...acc, [cur]: _post[cur] };
    //       },
    //       { id: doc.id, user_info: {} }
    //     );

    //     post_list.push(post);
    //   });

    //   post_list.pop();

    //   dispatch(setPost(post_list, paging));
    // });
  };
};

const deletePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      window.alert("아이디가 없네요!");
      return;
    }

    console.log(getState().user);

    // const postDB = firestore.collection("post").doc(post_id);
    // postDB
    // .delete()
    // .then((doc) => {
    //   console.log(doc, post_id)
    //   dispatch(deletePost(post_id));
    //   history.replace("/");
    // });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list.splice(idx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPostFB,
  deletePostFB,
};

export { actionCreators };
