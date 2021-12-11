import axios from "axios";

const api = axios.create({
  baseURL: "http://52.78.31.61",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
  return config;
});

export const apis = {
  //----post----
  boards: () => api.get(`/api/board/`),
  board: (id) => api.get(`/api/board/detail/${id}`),
  // ---- user ----
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
