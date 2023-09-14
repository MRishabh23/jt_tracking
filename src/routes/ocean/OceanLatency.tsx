import React, { useEffect, useState } from "react";
import { Form, Select, Spin } from "antd";
import Report from "../../components/report";
import { useDispatch, useSelector } from "react-redux";
import {
  carrierListAction,
  defaultListAction,
  latencyListAction,
} from "../../store/actions/ocean.action";
import { oceanCalls } from "../../api/oceanApi";

interface props {}

const OceanLatency: React.FC<props> = () => {
  // const [selectState, setSelectState] = useState<String[]>([]);
  const [isBulk, setIsBulk] = useState("false");
  const [msgErr, setMsgErr] = useState("");
  const [load, setLoad] = useState(false);
  const cList = useSelector((state: any) => state.ocean.carrierList);
  // const hasError = useSelector((state: any) => state.ocean.hasError);
  // const errorMsg = useSelector((state: any) => state.ocean.errorMsg);
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  const reload = () => {
    window.location.reload();
  };

  const carrierFunction = async () => {
    const sendData = {
      list: "carrierList",
    };

    const data = {
      carrierList: [],
      hasError: false,
      errorMsg: "",
    };

    await oceanCalls(sendData)
      .then((res) => {
        const result = res.data;
        if (result.statusCode === "200") {
          data.carrierList = result.response.sort();
          dispatch(carrierListAction(data));
        } else {
          throw { message: result.response };
        }
      })
      .catch((err) => {
        data.hasError = true;
        data.errorMsg = err.message;
        dispatch(carrierListAction(data));
      });
  };

  const onFinish = async (values: any) => {
    setMsgErr("");
    // const carrArr = values.carrier.length > 0 ? values.carrier : [];
    const carrArr = [values.carrier];
    const queStr =
      values.queue === undefined
        ? "normal"
        : values.queue !== undefined && values.queue !== ""
        ? values.queue
        : "normal";
    const refStr =
      values.refType === "booking"
        ? "BOOKING_NUMBER"
        : values.refType === "container"
        ? "CONTAINER_NUMBER"
        : values.refType === "bol"
        ? "BILL_OF_LADING"
        : "";

    const sendData = {
      type: "latency",
      mode: "ocean",
      report: queStr,
      carriers: carrArr,
      referenceType: refStr,
    };

    let data = {
      latencyList: [],
      hasError: false,
      errorMsg: "",
    };

    setLoad(false);
    await oceanCalls(sendData)
      .then((res) => {
        const result = res.data;
        if (res.status === 200 && result.statusCode === "200") {
          data.latencyList = result.response;
          dispatch(latencyListAction(data));
          setList(result.response);
          setLoad(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setMsgErr(err.message);
        data.hasError = true;
        data.errorMsg = err.message;
        dispatch(latencyListAction(data));
        setList([]);
        setLoad(true);
      });
  };

  const getList = async () => {
    const sendData = {
      type: "latency",
      mode: "ocean",
      report: "normal",
      carriers: [],
      referenceType: "",
    };

    let data = {
      defaultList: [],
      hasError: false,
      errorMsg: "",
    };
    setLoad(false);
    await oceanCalls(sendData)
      .then((res) => {
        if (res.status === 200 && res.data.statusCode === "200") {
          const result = res.data;
          data.defaultList = result.response;
          dispatch(defaultListAction(data));
          setList(result.response);
          setLoad(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setMsgErr(err.message);
        data.hasError = true;
        data.errorMsg = err.message;
        console.log(data);
        dispatch(defaultListAction(data));
        setList([]);
        setLoad(true);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    getList();
    carrierFunction();
    return () => controller.abort();
  }, []);

  // const handleChange = (value: any) => {
  //   let newState = [];

  //   for (let x in value) {
  //     newState.push(value[x]);
  //   }

  //   setSelectState(newState);
  // };

  return (
    <>
      <div className="w-full p-3">
        <div className="flex items-center justify-center font-semibold pt-2">
          <h3 className="text-3xl">Latency Report</h3>
        </div>
        <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-12">
          <Form
            name="basic"
            onFinish={onFinish}
            size="middle"
            className="flex flex-col gap-1 pt-3 lg:flex-row lg:gap-2"
            initialValues={{ queue: "normal" }}
          >
            <Form.Item
              label={<p className="text-lg">Carrier</p>}
              name="carrier"
              className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
              rules={[{ required: true, message: "Please input carrier!" }]}
            >
              <Select
                allowClear={true}
                // mode="multiple"
                // onChange={(value) => {
                //   handleChange(value)
                // }}
                onChange={(value) => {
                  console.log(value);
                  if (
                    value === "hapag" ||
                    value === "cma-cgm" ||
                    value === "msc" ||
                    value === "evergreen" ||
                    value === "maersk"
                  ) {
                    setIsBulk("true");
                  } else {
                    setIsBulk("false");
                  }
                }}
                placeholder="select carrier..."
              >
                {cList.length > 0 ? (
                  cList.map((item: any, index: any) => (
                    <Select.Option
                      // disabled={selectState.length === 5 && !selectState.includes(item.toLowerCase()) ? true : false}
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
              rules={
                isBulk === "true"
                  ? [
                      {
                        required: true,
                        message: "Please input reference type!",
                      },
                    ]
                  : []
              }
            >
              <Select placeholder="select reference type..." allowClear={true}>
                <Select.Option value="booking">Booking</Select.Option>
                <Select.Option value="bol">BillOfLading</Select.Option>
                <Select.Option value="container">Container</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Refresh
              </button>
            </Form.Item>
            <Form.Item>
              <button
                onClick={() => reload()}
                className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Reset Default
              </button>
            </Form.Item>
          </Form>
        </div>
        {msgErr !== "" ? (
          <div className="flex items-center justify-center h-full text-2xl font-medium bg-red-100 rounded-md mt-5 py-3">
            {msgErr.includes("timeout") ? "Request Timeout" : msgErr}
          </div>
        ) : (
          <div className="mt-7">
            {load ? (
              <Report latencyList={list} />
            ) : (
              <div className="flex items-center justify-center">
                <Spin tip="Loading..." size="large">
                  <div className="p-12 bg-stone-100 rounded-[4px]" />
                </Spin>
              </div>
            )}
          </div>
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default React.memo(OceanLatency);
