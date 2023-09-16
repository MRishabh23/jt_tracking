import React, { useState } from "react";
import { Form, Input } from "antd";
import { useLogin } from "../../api/auth";
import { VscLoading } from "react-icons/vsc";

interface props {}

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC<props> = () => {

  const [authData, setAuthData] = useState({username: "", password: ""});

  const onFinish = async (values: any) => {
    const sendData = {
      username: values.username,
      password: values.password,
    };
    setAuthData(sendData);
  };

  const {contextHolder, loading} = useLogin(authData);

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
                    className={`mr-2 animate-spin ${
                      loading ? "block" : "hidden"
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
