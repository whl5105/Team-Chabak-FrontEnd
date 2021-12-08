import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { deleteCookie, setCookie } from "../../shared/Cookie";
import { apis } from "../../shared/Api";

// action
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const USERINFO = "user/USERINFO";

// action creator
const setLogin = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOGOUT, (user) => ({ user }));

// initialState
const initialState = {
  nickaname: "suin",
  // username: null,
  // email: null,
  is_login: true,
};

// Thunk function

const registerDB = (id, email, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(id, email, pwd)
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        window.alert("이미 존재하는 아이디 또는 이메일입니다.");
        //에러 처리
      });
  };
};
// 로그인 버튼 클릭
const setLoginDB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(id, pwd)
      .then((res) => {
        setCookie("token", res.data[1].token, 7);
        // localStorage.setItem("username", res.data[0].username);
        dispatch(setLogin({ nickaname: id }));
        history.replace("/");
      })
      .catch((err) => {
        window.alert("없는 회원정보 입니다! 회원가입을 해주세요!");
        //빨간색 표시 알림
      });
  };
};

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    localStorage.removeItem("username");
    dispatch(logOut());
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

// reducer
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
  },
  initialState
);

const userCreators = {
  setLoginDB,
  registerDB,
  logOutDB,
  // loginCheckDB,
};

export { userCreators };
