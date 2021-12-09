import axios from "axios";

const api = axios.create({
  baseURL: "http://52.78.31.61:8080/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  //토큰정보 확인하고 다시 쪼개기
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
  return config;
});

export const apis = {
  // article
  add: (location, content, multipartFile, nickname) =>
    api.post("/api/board", location, content, multipartFile, nickname),
  edit: (location, content, multipartFile, id) =>
    api.put(`/api/board/detail/${id}`, location, content, multipartFile),
  del: (id) => api.delete(`/api/board/detail/${id}`),
  boards: (pageNum) => api.get(`/api/board/${pageNum}`),
  board: (id) => api.get(`/api/board/detail/${id}`),

  // comment
  // addComment: (id, content) =>
  // 	api.post(`/api/articles/${id}/comments`, { content }),
  // comments: (id) => api.get(`/api/articles/${id}/comments`),
  // delComment: (id, coId) => api.delete(`/api/articles/${id}/comments/${coId}`),
  // editComment: (id, coId, content) =>
  // 	api.put(`/api/articles/${id}/comments/${coId}`, { content }),

  // user
  login: (id, pwd) => api.post("/user/login", { nickname: id, password: pwd }),
  signup: (id, pwd, email) =>
    api.post("/user/signup", {
      nickname: id,
      password: pwd,
      email: email,
    }),

  signupId: (id) => api.post("/user/nickname/duplicate", { nickname: id }),

  logout: () => api.get("/api/logout"),
};
