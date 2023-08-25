import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { loginCall } from "../../api/auth";
import { useNavigate } from "react-router-dom";

interface props{}

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC<props> = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [btnLoad, setBtnLoad] = useState(false)

  const navigate = useNavigate()

  const msg = (type: any, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const onFinish = async (values: any) => {
    setBtnLoad(true)
    const sendData = {
      username: values.username,
      password: values.password,
    };
    await loginCall(sendData)
      .then((res) => {
        if (res.attempt == "failed") {
          throw {message: res.data};
        } else {
            msg("success", "Login Successful!!");
            localStorage.setItem("UserName", res.data)
            setTimeout(() => {
               navigate("/");
               window.location.reload();
            }, 1000)
        }
        setBtnLoad(false)
      })
      .catch((err) => {
        console.log("Err", err)
        msg("error", err.message);
        setBtnLoad(false)
      });
  };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log("Failed:", errorInfo);
  //   };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col h-screen bg-stone-50">
        <header className="flex-[1_1_0%] flex justify-center items-center bg-primary1 px-4">
          <h1 className="text-2xl font-semibold tracking-wider text-white xxs:text-3xl xs:text-4xl">
            SHIPMENT TRACKING
          </h1>
        </header>
        <main className="flex-[10_10_0%] flex justify-center items-center">
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={btnLoad}
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </main>
        <footer className="flex-[1_1_0%] flex justify-center items-center">
          <span>©2023 Justransform - All Rights Reserved.</span>
        </footer>
      </div>
    </>
  );
};

export default Login;
