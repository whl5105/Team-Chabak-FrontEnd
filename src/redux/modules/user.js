import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import { apis } from "../../shared/Api";

// action
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const SIGNUPID = "user/SIGNUPID";

// ---- action creator ----
const setLogin = createAction(LOGIN, (user) => ({ user }));
const logout = createAction(LOGOUT, (user) => ({ user }));
const signupId = createAction(SIGNUPID, (id) => ({ id }));

// ---- initialState ----
const initialState = {
  nickname: "suin",
  // username: null,
  // email: null,
  is_login: false, //로그인 확인
  response: null, //닉네임 중복 확인
};

//---- 회원가입 DB ----
export const signUpDB =
  (id, pwd, email) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.signup(id, pwd, email);
      console.log(response.data);
      history.replace("/user/login");
    } catch (err) {
      console.log(`오류 발생!${err}`);
    }
  };

//---- 회원가입 아이디 체크 DB ----
export const signUpIdCheckDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.signupId(id);
      console.log(response.data);
      dispatch(signupId(response));
    } catch (err) {
      console.log(`조회 오류 발생!${err}`);
    }
  };
//---- 로그인 DB ----
export const loginDB =
  (id, pwd) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.login(id, pwd);
      console.log(response);
      console.log(response.data);
      setCookie("token", response.data[1].token, 7);
      // localStorage.setItem("username", res.data[0].username);
      dispatch(setLogin({ nickaname: id }));
      history.replace("/");
    } catch (err) {
      window.alert("없는 회원정보 입니다! 회원가입을 해주세요!");
      console.log(`오류 발생!${err}`);
    }
  };

// //---- 로그아웃 DB ----
// const logoutDB = () => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .logout()
//       .then((res) => {
//         deleteCookie("token");

//         // localStorage.removeItem("username");
//         dispatch(logout());
//         history.replace("/");
//       })
//       .catch((err) => {
//         window.alert("로그아웃 에러 ");
//         //빨간색 표시 알림
//       });
//   };
// };

// ---- 로그아웃 DB ----
// export const logoutDB =
//   () =>
//   async (dispatch, getState, { history }) => {
//     try {
//       const response = await apis.logout();
//       deleteCookie("token");
//       console.log(response.data);
//       dispatch(logout());
//       history.replace("/");
//       // dispatch(signupId(response));
//     } catch (err) {
//       console.log(`로그아웃  오류 발생!${err}`);
//     }
//   };
const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logout());
    history.replace("/");
  };
};
// const loginCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     // const userId = localStorage.getItem("username");
//     const tokenCheck = document.cookie;
//     if (tokenCheck) {
//       dispatch(setLogin({ id: userId }));
//     } else {
//       dispatch(logOut());
//     }
//   };
// };

// ---- reducer ----
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("token");
        draft.user = null;
        draft.is_login = false;
      }),
    [SIGNUPID]: (state, action) =>
      produce(state, (draft) => {
        draft.response = action.payload.id;
      }),
  },
  initialState
);

const userCreators = {
  loginDB,
  signUpDB,
  logoutDB,
  signUpIdCheckDB,
  // loginCheckDB,
};

export { userCreators };
