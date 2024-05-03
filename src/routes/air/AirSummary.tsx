import React, { useState } from "react";
import { useCheckAuth } from "../../api/auth";
import { Form, Select, Table, DatePicker } from "antd";
import { useAirCarrierList } from "../../api/mode";
import { FaSpinner } from "react-icons/fa";
import {
  DataType,
  SummaryCreation,
  getSummaryColumns,
} from "../../components/report";
import { useSummaryList } from "../../api/mode";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD hh:mm:ss";

const AirSummary: React.FC = () => {
  useCheckAuth();
  const [selectState, setSelectState] = useState<String[]>([]);

  const [form] = Form.useForm();

  const [summaryParams, setSummaryParams] = useSearchParams({
    queue: "NORMAL",
  });

  const carrierParam = summaryParams.getAll("carriers") || [];
  const queueParam = summaryParams.get("queue") || "";
  const startParam = summaryParams.get("start") || "";
  const endParam = summaryParams.get("end") || "";

  const defaultStart =
    dayjs().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00";
  const defaultEnd = dayjs().format("YYYY-MM-DD") + " 23:59:59";

  const [showRange, setShowRange] = useState(
    carrierParam.length === 1 ? true : false
  );

  const { list, loading, summaryError } = useSummaryList(summaryParams, "AIR");

  const mainList = SummaryCreation(list);

  const data2: DataType[] =
    list === null || mainList.length === 0 ? [] : mainList;

  const { carrierList, airListError } = useAirCarrierList();
  const getSumCol = getSummaryColumns();

  const handleChange = (value: any) => {
    if (value.length === 1) {
      setShowRange(true);
    } else {
      setShowRange(false);
      // form.setFieldValue("range", undefined);
      summaryParams.delete("start");
      summaryParams.delete("end");
    }
    let newState = [];
    for (let x in value) {
      newState.push(value[x]);
    }
    setSelectState(newState);
  };

  const onFinish = async (values: any) => {
    let start = "";
    let end = "";
    if (
      values.range !== null &&
      values.range !== undefined &&
      values.range !== ""
    ) {
      const r = values.range[0];
      let day = r.$D.toString();
      if (day.length === 1) {
        day = "0" + day;
      }
      let month = (r.$M + 1).toString();
      if (month.length === 1) {
        month = "0" + month;
      }

      start = `${r.$y}-${month}-${day} 00:00:00`;

      const e = values.range[1];
      let eday = e.$D.toString();
      if (eday.length === 1) {
        eday = "0" + eday;
      }
      let emonth = (e.$M + 1).toString();
      if (emonth.length === 1) {
        emonth = "0" + emonth;
      }

      end = `${e.$y}-${emonth}-${eday} 23:59:59`;
    }

    const carrArr =
      values.carrier !== null &&
      values.carrier !== undefined &&
      values.carrier !== ""
        ? values.carrier
        : [];

    if (carrArr.length !== 1) {
      start = "";
      end = "";
    }
    // const time = values.timeDuration;

    const queStr =
      values.queue !== undefined && values.queue !== null && values.queue !== ""
        ? values.queue
        : "NORMAL";

    const sendData = {
      queue: queStr,
      carriers: carrArr,
      // timeDuration: time,
      start: start,
      end: end,
    };

    setSummaryParams(sendData);
  };

  return (
    <div className="relative w-full min-h-full p-3">
      <div className="flex items-center justify-center pt-2 font-semibold">
        <h3 className="text-3xl">Crawl Summary</h3>
      </div>
      <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-12">
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          size="middle"
          className="flex flex-col gap-1 pt-3 lg:flex-row lg:gap-2"
          initialValues={{
            carrier: carrierParam,
            queue: queueParam,
            range: [
              dayjs(defaultStart, dateFormat),
              dayjs(defaultEnd, dateFormat),
            ],
          }}
        >
          <Form.Item
            label={<p className="text-lg">Carrier</p>}
            name="carrier"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            // rules={[{ required: true, message: "Please input carrier!" }]}
          >
            <Select
              allowClear={true}
              //   mode={
              //     timeValue !== undefined && timeValue !== ""
              //       ? undefined
              //       : "multiple"
              //   }
              mode="multiple"
              onChange={(value) => {
                handleChange(value);
              }}
              placeholder="select carrier..."
            >
              {carrierList.length > 0 ? (
                carrierList.map((item: any, index: any) => (
                  <Select.Option
                    // disabled={
                    //   selectState.length === 5 &&
                    //   !selectState.includes(item.toLowerCase()) &&
                    //   (timeValue === undefined || timeValue === "")
                    //     ? true
                    //     : false
                    // }
                    disabled={
                      selectState.length === 5 &&
                      !selectState.includes(item.toLowerCase())
                        ? true
                        : false
                    }
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
            label={<p className="text-lg">Range</p>}
            name="range"
            className="min-w-[200px]"
          >
            <RangePicker
              disabled={!showRange}
              defaultValue={
                startParam === "" || endParam === ""
                  ? [dayjs(startParam, dateFormat), dayjs(endParam, dateFormat)]
                  : [dayjs(startParam, dateFormat), dayjs(endParam, dateFormat)]
              }
            />
          </Form.Item>
          {/* <Form.Item
            label={<p className="text-lg">Time Duration</p>}
            name="timeDuration"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select
              placeholder="select time duration..."
              allowClear={true}
              onChange={(value) => {
                if (value === undefined || value === "") {
                  setTimeValue("");
                  setSelectState([]);
                  form.setFieldValue("carrier", []);
                } else {
                  setTimeValue(value);
                  form.setFieldValue("carrier", "");
                }
              }}
            >
              <Select.Option value="7D">7 days</Select.Option>
              <Select.Option value="1M">1 month</Select.Option>
            </Select>
          </Form.Item> */}
          <Form.Item>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  setSummaryParams({
                    queue: "NORMAL",
                    // timeDuration: "",
                  });
                  form.setFieldValue("carrier", []);
                  form.setFieldValue("queue", "NORMAL");
                  setSelectState([]);
                }}
                className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Default
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {summaryError !== "" ? (
        <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
          {summaryError.includes("timeout") ? "Request Timeout" : summaryError}
        </div>
      ) : (
        <div className="mt-7">
          <div className="px-4 py-1 bg-gray-200 rounded-md">
            {list.length > 0 ? (
              <Table
                columns={getSumCol}
                bordered={true}
                dataSource={data2}
                loading={loading}
                pagination={{
                  pageSize: 5,
                  total: data2.length,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                  hideOnSinglePage: true,
                  showSizeChanger: false,
                  position: ["topRight", "bottomRight"],
                }}
                scroll={{ x: "1100px", y: "675px" }}
              />
            ) : (
              <>
                {list.length === 0 && loading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                  </div>
                ) : list.length === 0 &&
                  summaryParams.get("carriers")?.length !== 0 ? (
                  <p className="flex justify-center text-lg font-semibold text-black">
                    No records found for the searched filter
                  </p>
                ) : (
                  <p className="flex justify-center text-lg font-semibold text-black">
                    Select carriers to see their crawl summary...
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(AirSummary);
