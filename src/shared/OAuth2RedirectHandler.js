// 리다이렉트될 화면
import React from "react";
import { useDispatch } from "react-redux";
import { userCreators as userActions } from "../redux/modules/user";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();
  // ---- 인가코드 ----
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    dispatch(userActions.kakaoLogin(code));
  }, []);
  return <div></div>;
};

export default OAuth2RedirectHandler;
