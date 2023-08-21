import React, { useEffect, useState } from "react";
import { Button, Form, Select, Spin } from "antd";
import Report from "../../components/report";
import axios from "Axios";

// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

const OceanLatency: React.FC = () => {
  const [load, setLoad] = useState(false);
  const [carrierList, setCarrierList] = useState<Array<string>>([]);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });

  const carrierFunction = async () => {
    await axios({
      url: import.meta.env.VITE_REST_URL,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: import.meta.env.VITE_REST_USERNAME,
        password: import.meta.env.VITE_REST_PASSWORD,
      },
      data: {
        list: "carrierList",
      },
    })
      .then((res) => {
        setCarrierList(res.data.sort());
        setError({
          hasError: false,
          errorMsg: "",
        });
      })
      .catch((err) => {
        setError({
          hasError: true,
          errorMsg: err.message,
        });
      });
  };
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  useEffect(() => {
    let ignore = false;
    setTimeout(() => {
      setLoad(true);
    }, 2500);
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {error.hasError ? (
        <div className="flex items-center justify-center h-full text-2xl font-medium bg-red-100 rounded-md">
          {error.errorMsg}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-center">
            <h3 className="text-3xl">Latency Report</h3>
          </div>
          <div className="mt-12">
            <Form
              name="basic"
              //onFinish={onFinish}
              size="middle"
              className="flex flex-col gap-1 lg:flex-row lg:gap-2"
            >
              <Form.Item
                label={<p className="text-lg">Carrier</p>}
                name="carrier"
                className="min-w-[200px] lg:flex-1"
              >
                <Select
                  mode="multiple"
                  placeholder="select carriers..."
                  onFocus={() => {
                    if (carrierList.length === 0) {
                      carrierFunction();
                    } else {
                      return;
                    }
                  }}
                >
                  {carrierList.length > 0 ? (
                    carrierList.map((item: any, index) => (
                      <Select.Option
                        key={index}
                        value={`${item.toLowerCase()}`}
                      >
                        {item}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option value="loading...">
                      <Spin tip="Loading..." size="small">
                        <div className="p-12 bg-stone-100 rounded-[4px]" />
                      </Spin>
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item
                label={<p className="text-lg">Queue</p>}
                name="queue"
                className="min-w-[200px] lg:flex-1"
              >
                <Select placeholder="select a queue...">
                  <Select.Option value="normal">Normal</Select.Option>
                  <Select.Option value="adaptive">Adaptive</Select.Option>
                  <Select.Option value="rnf">404</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<p className="text-lg">Reference</p>}
                name="refType"
                className="min-w-[200px] lg:flex-1"
              >
                <Select placeholder="select reference type...">
                  <Select.Option value="booking">Booking</Select.Option>
                  <Select.Option value="bol">BillOfLading</Select.Option>
                  <Select.Option value="container">Container</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="text-white bg-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500"
                >
                  Refresh
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="mt-7">
            {load ? (
              <Report />
            ) : (
              <div className="flex items-center justify-center">
                <Spin tip="Loading..." size="large">
                  <div className="p-12 bg-stone-100 rounded-[4px]" />
                </Spin>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(OceanLatency);
