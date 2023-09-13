import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { loginCall } from "../../api/auth";
import { VscLoading } from "react-icons/vsc";
import { useDispatch,  } from "react-redux";
import { loginAction } from "../../store/actions/auth.action";

interface props { }

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC<props> = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [btnLoad, setBtnLoad] = useState(false);
  const dispatch = useDispatch();
  const msg = (type: any, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const onFinish = async (values: any) => {
    setBtnLoad(true);
    const sendData = {
      username: values.username,
      password: values.password,
    };
    await loginCall(sendData)
      .then((res) => {
        const result = res.data;
        if (result.statusCode === "200") {
          if (result.response.attempt === "failed") {
            throw { message: result.response.data };
          } else {
            msg("success", "Login Successful!!");
            localStorage.setItem("Username", result.response.data);
            setTimeout(() => {
              dispatch(loginAction());
            }, 1000)
          }
        }
        else {
          throw { message: result.response.data };
        }
        setBtnLoad(false);
      })
      .catch((err) => {
        msg("error", err.message);
        setBtnLoad(false);
      });
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center h-full">
        <div className="p-4 bg-gray-200 rounded-md">
          <div className="mb-3 font-bold">
            <h4>Sign in to your account</h4>
          </div>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="flex justify-center p-2">
              <Form.Item style={{ margin: "auto 0" }}>
                <button
                  type="submit"
                  className="px-4 py-1 flex text-white justify-center items-center border-[1px] border-blue-600 bg-blue-500 rounded-md hover:bg-blue-400"
                >
                  <VscLoading
                    className={`mr-2 animate-spin ${btnLoad ? "block" : "hidden"
                      }`}
                  />{" "}
                  Sign In
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
