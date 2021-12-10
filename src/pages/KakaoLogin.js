// import React, { useState, useEffect } from "react";
// import KakaoLogin from "react-kakao-login";

// export default function KakaoLogin() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
//     }
//   }, []);
//   return (
//     <KakaoLogin
//       token={String(process.env.NEXT_PUBLIC_KAKAO_APP_KEY)}
//       onSuccess={() => {
//         console.log("로그인성공", err);
//       }} // 성공 시 실행할 함수
//       onFail={(err) => {
//         console.log("로그인실패", err);
//       }}
//       onLogout={() => {
//         console.log("로그아웃");
//       }}
//       render={({ onClick }) => (
//         <div
//           onClick={(e) => {
//             e.preventDefault();
//             onClick();
//           }}
//         >
//           카카오로 로그인하기
//         </div>
//       )}
//     ></KakaoLogin>
//   );
// }
