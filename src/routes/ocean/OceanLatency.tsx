import React, { useEffect, useState } from "react";
import { Button, Form, Select, Spin } from "antd";
import Report from "../../components/report";
import { oceanCalls } from "../../api/oceanApi";

// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

interface props {}

const OceanLatency: React.FC<props> = () => {
  const [load, setLoad] = useState(false);
  const [carrierList, setCarrierList] = useState<Array<string> | null>(null);
  const [latencyList, setLatencyList] = useState<Array<object> | null>(null);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });

  const carrierFunction = async () => {
    const sendData = {
      list: "carrierList",
    };
    await oceanCalls(sendData)
      .then((res) => {
        setCarrierList(res.sort());
        setError({
          hasError: false,
          errorMsg: "",
        });
      })
      .catch((err) => {
        setError({
          hasError: true,
          errorMsg: err,
        });
      });
  };

  const onFinish = async (values: any) => {
    //console.log("Success:", values);
    const sendData = {
      type: "latency",
      mode: "ocean",
      report: values.queue == "normal" ? "default" : values.queue == "adaptive" ? "adaptive" : "default",
      carriers: values.carrier,
      referenceType:
        values.refType === "booking"
          ? "BOOKING_NUMBER"
          : values.refType === "container"
          ? "CONTAINER_NUMBER"
          : values.refType === "bol"
          ? "BILL_OF_LADING"
          : "",
    };
    setLoad(false);
    await oceanCalls(sendData)
      .then((res) => {
        setLatencyList(res);
        setLoad(true);
        setError({
          hasError: false,
          errorMsg: "",
        });
      })
      .catch((err) => {
        setError({
          hasError: true,
          errorMsg: err,
        });
      });
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  const getList = async () => {
    const sendData = {
      type: "latency",
      mode: "ocean",
      report: "default",
      carriers: [],
      referenceType: "",
    };
    await oceanCalls(sendData)
      .then((res) => {
        if (latencyList === null) {
          setLatencyList(res);
          setLoad(true);
          setError({
            hasError: false,
            errorMsg: "",
          });
        }
        //console.log("res", res)
      })
      .catch((err) => {
        //console.log("err", err)
        setError({
          hasError: true,
          errorMsg: err,
        });
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    getList();
    return () => controller.abort();
  }, []);

  return (
    <>
      {error.hasError ? (
        <div className="flex items-center justify-center h-full text-2xl font-medium bg-red-100 rounded-md">
          {error.errorMsg}
        </div>
      ) : (
        <div className="w-full px-4 py-2 md:px-10 md:py-4">
          <div className="flex items-center justify-center pt-2">
            <h3 className="text-3xl">Latency Report</h3>
          </div>
          <div className="mt-8 lg:mt-12">
            <Form
              name="basic"
              onFinish={onFinish}
              size="middle"
              className="flex flex-col gap-1 lg:flex-row lg:gap-2"
            >
              <Form.Item
                label={<p className="text-lg">Carrier</p>}
                name="carrier"
                className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
                rules={[
                  { required: true, message: "Please input carrier!" },
                ]}
              >
                <Select
                allowClear={true}
                  mode="multiple"
                  placeholder="select carriers..."
                  onFocus={() => {
                    if (carrierList === null) {
                      carrierFunction();
                    } else {
                      return;
                    }
                  }}
                >
                  {carrierList !== null ? (
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
                className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
              >
                <Select placeholder="select a queue..." allowClear={true}>
                  <Select.Option value="normal">Normal</Select.Option>
                  <Select.Option value="adaptive">Adaptive</Select.Option>
                  {/* <Select.Option value="rnf">Reference Not Found</Select.Option> */}
                </Select>
              </Form.Item>

              <Form.Item
                label={<p className="text-lg">Reference</p>}
                name="refType"
                className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
              >
                <Select placeholder="select reference type..." allowClear={true}>
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
              <Report latencyList={latencyList} carrierList={carrierList} />
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
