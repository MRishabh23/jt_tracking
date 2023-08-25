import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { loginCall } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

interface props {}

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC<props> = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [btnLoad, setBtnLoad] = useState(false);

  const navigate = useNavigate();

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
        //console.log("res", res)
        if (res.attempt == "failed") {
          throw { message: res.data };
        } else {
          msg("success", "Login Successful!!");
          localStorage.setItem("UserName", res.data);
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 1000);
        }
        setBtnLoad(false);
      })
      .catch((err) => {
        //console.log("Err", err)
        msg("error", err.message);
        setBtnLoad(false);
      });
  };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <>
      {contextHolder}
      <div className="p-4 bg-gray-200 rounded-md">
        <div className="mb-3">
          <h4>Sign in to your account</h4>
        </div>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
                  className={`mr-2 animate-spin ${
                    btnLoad ? "block" : "hidden"
                  }`}
                />{" "}
                Sign In
              </button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
