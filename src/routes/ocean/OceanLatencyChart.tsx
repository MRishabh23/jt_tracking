import React, { useState } from "react";
import { useCheckAuth } from "../../api/auth";
import { Form, Select } from "antd";
import { FaSpinner } from "react-icons/fa";
import { useCarrierList } from "../../api/ocean";
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
import { latencyData } from "../ocean/tempData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OceanLatencyChart: React.FC = () => {
  useCheckAuth();
  const [selectState, setSelectState] = useState<String[]>([]);
  const { carrierList } = useCarrierList();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    //   title: {
    //     display: true,
    //     text: "Daily JT induced latency",
    //   },
      layout: {
        padding: 100
      }
    },
  };

  const carriers = ["HAPAG", "ACL", "MSC"];
  const bgArray = ["LightSalmon","LightSkyBlue","Violet"];
  const borderArray = ["Salmon","CornflowerBlue","HotPink"];

  let labels: any[]=[]
  for(let i=1;i<=31;i++){
    labels.push(i)
  }

  const handleChange = (value: any) => {
    let newState = [];
    for (let x in value) {
      newState.push(value[x]);
    }
    setSelectState(newState);
  };
  const val:any = carriers.map((carrier, index) => {
    for (const key in latencyData) {
      if (key === carrier) {
        const countObj = latencyData[key];
        let dataArr: number[] = [];
        for (const date in countObj) {
          dataArr.push(countObj[date]);
        }
        // console.log(dataArr)
        return {
          label: carrier,
          data: dataArr,
          backgroundColor: bgArray[index],
          borderColor: borderArray[index]
        };
      }
    }
  })

 const data = {
    labels,
    datasets: val,
  };

  return (
    <div className="relative w-full min-h-full p-3 pt-1">
      <div className="flex items-center justify-center font-semibold">
        <h3 className="text-3xl">JT Induced Latency</h3>
      </div>
      <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-4">
        <Form
          name="basic"
          //   onFinish={onFinish}
          //   form={form}
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
              ) : (
                <Select.Option value="loading...">
                  <FaSpinner className="text-2xl text-blue-500 animate-spin" />
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Year</p>}
            name="Year"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select placeholder="select year..." allowClear={false}>
              <Select.Option value="2024">2024</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Month</p>}
            name="Month"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select placeholder="select month..." allowClear={false}>
              <Select.Option value="JAN">January</Select.Option>
              <Select.Option value="FEB">February</Select.Option>
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
      <div className="mt-3 h-[35rem]">
        <div className="min-h-full py-4 px-10 bg-gray-200 rounded-md">
            <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(OceanLatencyChart);