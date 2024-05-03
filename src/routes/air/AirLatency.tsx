import React from "react";
import { Form, Select, Table } from "antd";
import {
  DataType,
  getLatencyColumns,
  latencyCreation,
} from "../../components/report";
import { useLatencyList, useAirCarrierList } from "../../api/mode";
import { useCheckAuth } from "../../api/auth";
import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

interface props {}

const AirLatency: React.FC<props> = () => {
  useCheckAuth();

  const [params, setParams] = useSearchParams({
    queue: "NORMAL",
    carriers: [],
    referenceType: "",
  });

  const carrierParam = params.getAll("carriers") || [];
  const queueParam = params.get("queue") || "";
  const refParam = params.get("referenceType") || "";

  const { carrierList, airListError } = useAirCarrierList();
  const { list, loading, latencyError = "" } = useLatencyList(params, "AIR");

  const onFinish = (values: any) => {
    const carrArr = [values.carrier];
    const queStr =
      values.queue !== undefined && values.queue !== null && values.queue !== ""
        ? values.queue
        : "NORMAL";
    const refStr =
      values.refType !== undefined &&
      values.refType !== null &&
      values.refType !== ""
        ? values.refType
        : "";

    const sendData = {
      queue: queStr,
      carriers: carrArr,
      referenceType: refStr,
    };
    setParams(sendData);
  };

  const mainList = latencyCreation(list);
  const getLatCol = getLatencyColumns(mainList, "AIR");

  const data2: DataType[] =
    list === null || mainList.length === 0 ? [] : mainList;

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
        <div className="flex items-center justify-center pt-2 font-semibold">
          <h3 className="text-3xl">Latency Report</h3>
        </div>
        <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-12">
          <Form
            name="basic"
            onFinish={onFinish}
            size="middle"
            className="flex flex-col gap-1 pt-3 lg:flex-row lg:gap-2"
            initialValues={{
              queue: queueParam,
              carrier: carrierParam,
              refType: refParam,
            }}
          >
            <Form.Item
              label={<p className="text-lg">Carrier</p>}
              name="carrier"
              className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
              rules={[{ required: true, message: "Please input carrier!" }]}
            >
              <Select allowClear={true} placeholder="select carrier...">
                {carrierList.length > 0 ? (
                  carrierList.map((item: any, index: any) => (
                    <Select.Option
                      // disabled={selectState.length === 5 && !selectState.includes(item.toLowerCase()) ? true : false}
                      key={index}
                      value={`${item.toLowerCase()}`}
                    >
                      {item}
                    </Select.Option>
                  ))
                ) : airListError !== undefined && airListError !== "" ? (
                  <Select.Option value="error">
                    <p>{airListError}</p>
                  </Select.Option>
                ) : (
                  <Select.Option value="loading...">
                    <FaSpinner className="text-2xl text-blue-500 animate-spin" />
                  </Select.Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label={<p className="text-lg">Queue</p>}
              name="queue"
              className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            >
              <Select placeholder="select a queue..." allowClear={false}>
                <Select.Option value="NORMAL">Normal</Select.Option>
                {/* <Select.Option value="ADAPTIVE">Adaptive</Select.Option> */}
                <Select.Option value="RNF">Reference Not Found</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<p className="text-lg">Reference</p>}
              name="refType"
              className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            >
              <Select placeholder="select reference type..." allowClear={true}>
                <Select.Option value="AWB">AWB</Select.Option>
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
          </Form>
        </div>
        {latencyError !== "" ? (
          <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
            {latencyError.includes("timeout")
              ? "Request Timeout"
              : latencyError}
          </div>
        ) : (
          <div className="mt-7">
            <div className="p-4 bg-gray-200 rounded-md">
              {loading && list.length > 0 ? (
                <Table
                  columns={getLatCol}
                  dataSource={data2}
                  pagination={false}
                  scroll={{ x: "1100px", y: "675px" }}
                />
              ) : loading && list.length === 0 && carrierParam.length === 0 ? (
                <p className="flex justify-center text-lg font-semibold text-black">
                  Select Carrier to see Latency data!
                </p>
              ) : loading && list.length === 0 && carrierParam.length !== 0 ? (
                <p className="flex justify-center text-lg font-semibold text-black">
                  No data for the selected filter
                </p>
              ) : (
                <div className="flex items-center justify-center">
                  <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(AirLatency);
