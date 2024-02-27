import React, { useEffect, useState } from "react";
import { useCheckAuth } from "../../api/auth";
import { Form, Select } from "antd";
import { FaSpinner } from "react-icons/fa";
import { useCarrierList, useLatencyChart } from "../../api/ocean";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSearchParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getMonthsToThisYear() {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0 (January) to 11 (December)
  
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    // Check if current date is 2nd or later in the current month
    const includeCurrentMonth = today.getDate() >= 2;
  
    if (includeCurrentMonth) {
      return monthNames.slice(0, currentMonth + 1);
    } else {
      return monthNames.slice(0, currentMonth);
    }
  }

const OceanLatencyChart: React.FC = () => {
  useCheckAuth();
  const [form] = Form.useForm();
  form.setFieldValue("year", "2024");


  const monthsList = getMonthsToThisYear();
  const { carrierList } = useCarrierList();

  const [latencyChartParam, setLatencyChartParam] = useSearchParams();
  const [selectState, setSelectState] = useState<String[]>(latencyChartParam.getAll("carriers") || []);
  // const [selectedCarrier, setSelectedCarrier] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState<String[]>(latencyChartParam.getAll("months") || []);
  const {
    list,
    loading,
    latencyChartError = "",
  } = useLatencyChart(latencyChartParam);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      layout: {
        padding: 100,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day"
        },
      },
      y: {
        title: {
          display: true,
          text: "Latency in mins"
        },
      },
    },
  };

  let chartKeys: any;
  const dataSet = list[0];
  if (dataSet === null || dataSet === undefined || dataSet === "") {
    chartKeys = [];
  } else {
    chartKeys = Object.keys(dataSet);
  }
  const bgArray = ["LightSalmon", "LightSkyBlue", "MediumSeaGreen "];
  const borderArray = ["Salmon", "CornflowerBlue", "SeaGreen "];

  let labels: any[] = [];
  for (let i = 1; i <= 31; i++) {
    labels.push(i);
  }

  const handleChange = (value: any) => {
    let newState = [];
    for (let x in value) {
      newState.push(value[x]);
    }
    setSelectState(newState);
  };

  const handleMonthChange = (value: any) => {
    let newState = [];
    for (let x in value) {
      newState.push(value[x]);
    }
    setSelectedMonth(newState);
  };
  const val: any = chartKeys.map((keys: any, index: any) => {
    for (const key in dataSet) {
      if (key === keys) {
        const dataArr = dataSet[key];
        return {
          label: key,
          data: dataArr,
          backgroundColor: bgArray[index],
          borderColor: borderArray[index],
        };
      }
    }
  })

 const data = {
    labels,
    datasets: val,
  };

  const onFinish = async (values: any) => {
    const carriers = values.carrier;
    const year = values.year;
    const months = values.month;
    const sendData = {
      carriers: carriers,
      year: year,
      months: months,
    };
    setLatencyChartParam(sendData);
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      latencyChartParam.get("carriers") === null
        ? form.setFieldValue("carrier", [])
        : form.setFieldValue("carrier", latencyChartParam.getAll("carriers"));

      latencyChartParam.get("months") === null
        ? form.setFieldValue("month", [])
        : form.setFieldValue("month", latencyChartParam.getAll("months"));
    }

    return () => {
      ignore = true;
    };
  }, [latencyChartParam]);


  return (
    <div className="relative w-full min-h-full p-3 pt-1">
      <div className="flex items-center justify-center font-semibold">
        <h3 className="text-3xl">JT Induced Latency</h3>
      </div>
      <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-4">
      <p className="text-sm text-red-600">
          {" "}
          ** You can either select multiple carriers or multiple months
        </p>
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          size="middle"
          className="flex flex-col gap-1 pt-3 lg:flex-row lg:gap-2"
          //   initialValues={{ carrier: carrierParam, queue: queueParam, range:[dayjs(defaultStart, dateFormat), dayjs(defaultEnd, dateFormat)] }}
        >
          <Form.Item
            label={<p className="text-lg">Carrier</p>}
            name="carrier"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            rules={[{ required: true, message: "Please input carrier!" }]}
          >
            <Select
              allowClear={true}
              mode="multiple"
              onChange={(value) => {
                handleChange(value);
              }}
              placeholder="select carrier..."
            >
              {carrierList.length > 0 ? (
                carrierList.map((item: any, index: any) => (
                  <Select.Option
                    disabled={
                        ((selectedMonth.length > 1 && selectState.length === 1) ||
                        selectState.length === 3) &&
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
              ) : (
                <Select.Option value="loading...">
                  <FaSpinner className="text-2xl text-blue-500 animate-spin" />
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Year</p>}
            name="year"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select placeholder="select year..." allowClear={false}>
              <Select.Option value="2024">2024</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Month</p>}
            name="month"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select
              placeholder="select month..."
              allowClear={true}
              mode="multiple"
              onChange={(value) => {
                handleMonthChange(value);
              }}
            >
              {monthsList.map((item: any, index: any) => (
                <Select.Option
                  disabled={
                    ((selectState.length > 1 && selectedMonth.length === 1) ||
                      selectedMonth.length === 3) &&
                    !selectedMonth.includes(item.substring(0, 3).toLowerCase())
                      ? true
                      : false
                  }
                  key={index}
                  value={`${item.substring(0, 3).toLowerCase()}`}
                >
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Refresh
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
      {latencyChartError !== "" || latencyChartError !== "" ? (
        <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
          {latencyChartError.includes("timeout")
            ? "Request Timeout"
            : latencyChartError}
        </div>
      ) : (
        <div
          className={`mt-3 ${
            chartKeys.length !== 0 && !loading ? `h-[35rem]` : `h-full`
          }`}
        >
          <div className="min-h-full py-4 px-10 bg-gray-200 rounded-md">
            {chartKeys.length !== 0 && !loading ? (
              <Line options={options} data={data} />
            ) : (
              <>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                  </div>
                ) : (
                  <p className="flex justify-center text-lg font-semibold text-black">
                    Enter Carrier, Month and Year to see Induced Latency!
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

export default React.memo(OceanLatencyChart);