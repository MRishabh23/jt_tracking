import axios from "axios";

export async function oceanCalls(data: object) {
  const user = localStorage.getItem("Username");
  const newData : any = data;
  if(user !== null && user !== undefined && user !== "")
  {
    newData.currentUser = user;
  }
 return axios({
    url: import.meta.env.VITE_REST_URL,
    timeout: 300000, 
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: import.meta.env.VITE_REST_PROD_USERNAME,
      password: import.meta.env.VITE_REST_PROD_PASSWORD,
    },
    data: newData,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}
