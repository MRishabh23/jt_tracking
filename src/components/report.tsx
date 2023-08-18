import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  carrier: string;
  refType: string;
  total: number;
  zeroToOne: number;
  oneToTwo: number;
  twoToFour: number;
  fourToEight: number;
  eightToSixteen: number;
  sixteenToTwentyFour: number;
  twentyFourToFourtyEight: number;
  fourtyEightAbove: number;
}

const Report: React.FC = () => {
  const colors = ["geekblue", "green", "volcano"];
  let color: any;
  // const handleClick = (record: any) => {
  //     console.log(record)
  //     //onClick={() => handleClick(record)}
  // }
  const columns: ColumnsType<DataType> = [
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      filters: [
        {
          text: "CMA-CGM",
          value: "CMA-CGM",
        },
        {
          text: "HAPAG-LLOYD",
          value: "HAPAG-LLOYD",
        },
        {
          text: "HYUNDAI",
          value: "HYUNDAI",
        },
        {
          text: "EVERGREEN",
          value: "EVERGREEN",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.carrier.includes(value),
      fixed: true,
      width: 130,
      align: "center"
    },
    {
      title: "RefType",
      key: "refType",
      dataIndex: "refType",
      render: (refType) => (
        <Tag
          color={
            refType == "Booking"
              ? colors[0]
              : refType == "Container"
              ? colors[1]
              : colors[2]
          }
          key={color}
        >
          {refType.toUpperCase()}
        </Tag>
      ),
      filters: [
        {
          text: "Booking",
          value: "Booking",
        },
        {
          text: "BillOfLading",
          value: "BillOfLading",
        },
        {
          text: "Container",
          value: "Container",
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record) => record.refType.includes(value),
      fixed: true,
      width: 125,
      align: "center"
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=total&count=${record.total}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.total - b.total,
      align: "center"
    },
    {
      title: "0_1",
      dataIndex: "zeroToOne",
      key: "zeroToOne",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=0_1&count=${record.zeroToOne}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.zeroToOne - b.zeroToOne,
      align: "center"
    },
    {
      title: "1_2",
      dataIndex: "oneToTwo",
      key: "oneToTwo",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=1_2&count=${record.oneToTwo}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.oneToTwo - b.oneToTwo,
      align: "center"
    },
    {
      title: "2_4",
      dataIndex: "twoToFour",
      key: "twoToFour",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=2_4&count=${record.twoToFour}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.twoToFour - b.twoToFour,
      align: "center"
    },
    {
      title: "4_8",
      dataIndex: "fourToEight",
      key: "fourToEight",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=4_8&count=${record.fourToEight}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.fourToEight - b.fourToEight,
      align: "center"
    },
    {
      title: "8_16",
      dataIndex: "eightToSixteen",
      key: "eightToSixteen",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=8_16&count=${record.eightToSixteen}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.eightToSixteen - b.eightToSixteen,
      align: "center"
    },
    {
      title: "16_24",
      dataIndex: "sixteenToTwentyFour",
      key: "sixteenToTwentyFour",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=16_24&count=${record.sixteenToTwentyFour}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.sixteenToTwentyFour - b.sixteenToTwentyFour,
      align: "center"
    },
    {
      title: "24_48",
      dataIndex: "twentyFourToFourtyEight",
      key: "twentyFourToFourtyEight",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=24_48&count=${record.twentyFourToFourtyEight}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.twentyFourToFourtyEight - b.twentyFourToFourtyEight,
      align: "center"
    },
    {
      title: ">48",
      dataIndex: "fourtyEightAbove",
      key: "fourtyEightAbove",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/dashboard/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=gt48&count=${record.fourtyEightAbove}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.fourtyEightAbove - b.fourtyEightAbove,
      align: "center"
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      carrier: "CMA-CGM",
      refType: "Booking",
      total: 200,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "2",
      carrier: "CMA-CGM",
      refType: "BillOfLading",
      total: 400,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "3",
      carrier: "CMA-CGM",
      refType: "Container",
      total: 100,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "4",
      carrier: "HAPAG-LLOYD",
      refType: "Booking",
      total: 500,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "5",
      carrier: "HAPAG-LLOYD",
      refType: "BillOfLading",
      total: 250,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "6",
      carrier: "HAPAG-LLOYD",
      refType: "Container",
      total: 50,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "7",
      carrier: "HYUNDAI",
      refType: "Booking",
      total: 900,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "8",
      carrier: "HYUNDAI",
      refType: "BillOfLading",
      total: 570,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "9",
      carrier: "HYUNDAI",
      refType: "Container",
      total: 290,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "10",
      carrier: "EVERGREEN",
      refType: "Booking",
      total: 670,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "11",
      carrier: "EVERGREEN",
      refType: "BillOfLading",
      total: 130,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "12",
      carrier: "EVERGREEN",
      refType: "Container",
      total: 70,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "13",
      carrier: "COSCO",
      refType: "Booking",
      total: 710,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "14",
      carrier: "COSCO",
      refType: "BillOfLading",
      total: 470,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
    {
      key: "15",
      carrier: "COSCO",
      refType: "Container",
      total: 170,
      zeroToOne: 10,
      oneToTwo: 20,
      twoToFour: 10,
      fourToEight: 10,
      eightToSixteen: 10,
      sixteenToTwentyFour: 10,
      twentyFourToFourtyEight: 20,
      fourtyEightAbove: 20,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    //console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 24, disabled: true, hideOnSinglePage: true }}
        scroll={{ x: "1100px", y: "650px" }}
        //style={{height: 600}}
      />
    </div>
  );
};

export default Report;
