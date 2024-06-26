import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/actions/auth.action";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface LoginProp {
  username: string;
  password: string;
}

async function loginCall(data: LoginProp) {
  return axios({
    url: import.meta.env.VITE_REST_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: import.meta.env.VITE_REST_USERNAME,
      password: import.meta.env.VITE_REST_PASSWORD,
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

export const useLogin = (data: LoginProp) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const msg = (type: any, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let ignore = false;
    const authCall = async () => {
      setLoading(true);
      await loginCall(data)
        .then((res) => {
          const result = res.data;
          if (result.statusCode === "200") {
            if (result.response.success === false) {
              throw { message: result.response.data };
            } else {
              msg("success", "Login Successful!!");
              localStorage.setItem("Username", result.response.data);
              setTimeout(() => {
                dispatch(loginAction());
              }, 1000);
            }
          } else {
            throw { message: result.response.data };
          }
          setLoading(false);
        })
        .catch((err) => {
          msg("error", err.message);
          setLoading(false);
        });
    };
    if(!ignore && data.username !== "" && data.password !== ""){
      authCall();
    }

    return () => {
      ignore = true;
    }
  }, [data]);

  return {contextHolder, loading}
};

export const useCheckAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let ignore = false;
    const user = localStorage.getItem("Username");
    if (!ignore) {
      if (user === undefined || user === null || user === "") {
        navigate("/");
      }
    }
    return () => {
      ignore = true;
    };
  }, []);
}