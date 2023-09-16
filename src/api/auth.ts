import axios from "axios";

export async function loginCall(data: object) {
 return axios({
    url: import.meta.env.VITE_REST_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: import.meta.env.VITE_REST_DEV_USERNAME,
      password: import.meta.env.VITE_REST_DEV_PASSWORD,
    },
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}