import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// ---- action ----
// const UPLOADING = "UPLOADING";
const SET_PREVIEW = "SET_PREVIEW";

// ---- action creators ----
// const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// ---- initialState ----
const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

// ---- reducer ----
export default handleActions(
  {
    // [UPLOADING]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.uploading = action.payload.uploading;
    //   }),

    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const ActionCreators = {
  setPreview,
};

export { ActionCreators };
