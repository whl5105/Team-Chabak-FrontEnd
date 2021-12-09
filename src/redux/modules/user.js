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
// const signUpDB = (id, email, pwd) => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .signup(id, email, pwd)
//       .then(function (response) {
//         //회원가입 확인
//         console.log(response);
//       })
//       .catch(function (error) {
//         //회원가입 에러
//         console.log(error);
//       });
//   };
// };
//---- 회원가입 DB ----
export const signUpDB =
  (id, pwd, email) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.signup(id, pwd, email);
      console.log(response.data);
    } catch (err) {
      console.log(`오류 발생!${err}`);
    }
  };

//----회원가입 아이디 확인 ----
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
//----로그인  ----
export const loginDB =
  (id, pwd) =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.login(id, pwd);
      console.log(response);
      console.log(response.data);
      setCookie("token", response.data[1].token, 7);
      dispatch(setLogin({ nickaname: id }));
      history.replace("/");
    } catch (err) {
      window.alert("없는 회원정보 입니다! 회원가입을 해주세요!");
      console.log(`오류 발생!${err}`);
    }
  };

// //---- 로그인  DB ----
// const loginDB = (id, pwd) => {
//   console.log(id, pwd);
//   return function (dispatch, getState, { history }) {
//     apis
//       .login(id, pwd)
//       .then((res) => {
//         // setCookie("is_login", res.data[1].token, 7);
//         setCookie("token", res.data[1].token, 7);
//         // localStorage.setItem("username", res.data[0].username);
//         dispatch(setLogin({ nickaname: id }));
//         history.replace("/");
//       })
//       .catch((err) => {
//         window.alert("없는 회원정보 입니다! 회원가입을 해주세요!");
//         //빨간색 표시 알림
//       });
//   };
// };
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
// ---- 로그아웃 ----
export const logoutDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const response = await apis.logout();
      deleteCookie("token");
      console.log(response.data);
      dispatch(logout());
      history.replace("/");
      // dispatch(signupId(response));
    } catch (err) {
      console.log(`로그아웃  오류 발생!${err}`);
    }
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
