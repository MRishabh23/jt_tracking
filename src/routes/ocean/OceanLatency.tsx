import React, { useEffect, useState } from "react";
import { Form, Select, Table } from "antd";
import {
  DataType,
  getLatencyColumns,
  latencyCreation,
} from "../../components/report";
import { OceanProp, useCarrierList, useLatencyList } from "../../api/oceanApi";
import { useDispatch, useSelector } from "react-redux";
import { latencyListAction } from "../../store/actions/ocean.action";
import { useCheckAuth } from "../../api/auth";
import { FaSpinner } from "react-icons/fa";

interface props {}

const OceanLatency: React.FC<props> = () => {
  useCheckAuth();
  // const [selectState, setSelectState] = useState<String[]>([]);
  const [isBulk, setIsBulk] = useState("false");
  const gError = useSelector((state: any) => state.ocean.lError);
  const [carrData, setCarrData] = useState<OceanProp>({
    type: "LATENCY",
    mode: "OCEAN",
    report: "NORMAL",
    carriers: [],
    referenceType: "",
  });
  const { carrierList } = useCarrierList();
  const { list, loading } = useLatencyList(carrData);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const bulkCarriers = ["hapag", "cma-cgm", "maersk", "msc", "evergreen"];

  const onFinish = (values: any) => {
    dispatch(latencyListAction({ error: "" }));
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
      type: "LATENCY",
      mode: "OCEAN",
      report: queStr,
      carriers: carrArr,
      referenceType: refStr,
    };
    setCarrData(sendData);
  };

  const mainList = latencyCreation(list);
  const getLatCol = getLatencyColumns(mainList);

  const data2: DataType[] =
    list === null || mainList.length === 0 ? [] : mainList;

  // const handleChange = (value: any) => {
  //   let newState = [];
  //   for (let x in value) {
  //     newState.push(value[x]);
  //   }
  //   setSelectState(newState);
  // };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (gError !== "") {
        setError(gError);
      } else {
        setError("");
      }
    }
    return () => {
      ignore = true;
    };
  }, [gError]);

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
            initialValues={{ queue: "NORMAL" }}
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
                  if (bulkCarriers.includes(value)) {
                    setIsBulk("true");
                  } else {
                    setIsBulk("false");
                  }
                }}
                placeholder="select carrier..."
              >
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
              <Select placeholder="select a queue..." allowClear={true}>
                <Select.Option value="NORMAL">Normal</Select.Option>
                <Select.Option value="ADAPTIVE">Adaptive</Select.Option>
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
                <Select.Option value="BOOKING_NUMBER">Booking</Select.Option>
                <Select.Option value="BILL_OF_LADING">
                  BillOfLading
                </Select.Option>
                <Select.Option value="CONTAINER_NUMBER">
                  Container
                </Select.Option>
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
                onClick={() => window.location.reload()}
                className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Reset Default
              </button>
            </Form.Item>
          </Form>
        </div>
        {error !== "" ? (
          <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
            {error.includes("timeout") ? "Request Timeout" : error}
          </div>
        ) : (
          <div className="mt-7">
            <div className="p-4 bg-gray-200 rounded-md">
              {loading ? (
                <Table
                  columns={getLatCol}
                  dataSource={data2}
                  pagination={{
                    pageSize: 24,
                    disabled: true,
                    hideOnSinglePage: true,
                  }}
                  scroll={{ x: "1100px", y: "675px" }}
                />
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

export default React.memo(OceanLatency);
