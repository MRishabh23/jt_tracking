import React from "react";
import { Table, Tag } from "antd";
//import type { ColumnsType, TableProps } from "antd/es/table";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface props {
  latencyList: Array<object> | null;
  carrierList: Array<string> | null;
}

interface DataType {
  key: React.Key;
  carrier: string;
  refType: string;
  total: number;
  zeroToOne: number;
  oneToTwo: number;
  twoToFour: number;
  fourToEight: number;
  eightToTwelve: number;
  twelveToSixteen: number;
  sixteenToTwentyFour: number;
  twentyFourToFourtyEight: number;
  fourtyEightAbove: number;
}

const Report: React.FC<props> = ({ latencyList, carrierList }) => {
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
      filters: carrierList !== null ? carrierList.map((item: string) => {
        return {
          text: item,
          value: item
        }
      }) : [],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.carrier.includes(value),
      fixed: true,
      width: 130,
      align: "center",
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
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=total&count=${record.total}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.total - b.total,
      align: "center",
    },
    {
      title: "0_1",
      dataIndex: "zeroToOne",
      key: "zeroToOne",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=0_1&count=${record.zeroToOne}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.zeroToOne - b.zeroToOne,
      align: "center",
    },
    {
      title: "1_2",
      dataIndex: "oneToTwo",
      key: "oneToTwo",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=1_2&count=${record.oneToTwo}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.oneToTwo - b.oneToTwo,
      align: "center",
    },
    {
      title: "2_4",
      dataIndex: "twoToFour",
      key: "twoToFour",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=2_4&count=${record.twoToFour}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.twoToFour - b.twoToFour,
      align: "center",
    },
    {
      title: "4_8",
      dataIndex: "fourToEight",
      key: "fourToEight",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=4_8&count=${record.fourToEight}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.fourToEight - b.fourToEight,
      align: "center",
    },
    {
      title: "8_12",
      dataIndex: "eightToTwelve",
      key: "eightToTwelve",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=8_12&count=${record.eightToTwelve}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.eightToTwelve - b.eightToTwelve,
      align: "center",
    },
    {
      title: "12_16",
      dataIndex: "twelveToSixteen",
      key: "twelveToSixteen",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=12_16&count=${record.twelveToSixteen}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.twelveToSixteen - b.twelveToSixteen,
      align: "center",
    },
    {
      title: "16_24",
      dataIndex: "sixteenToTwentyFour",
      key: "sixteenToTwentyFour",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=16_24&count=${record.sixteenToTwentyFour}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.sixteenToTwentyFour - b.sixteenToTwentyFour,
      align: "center",
    },
    {
      title: "24_48",
      dataIndex: "twentyFourToFourtyEight",
      key: "twentyFourToFourtyEight",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=24_48&count=${record.twentyFourToFourtyEight}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.twentyFourToFourtyEight - b.twentyFourToFourtyEight,
      align: "center",
    },
    {
      title: ">48",
      dataIndex: "fourtyEightAbove",
      key: "fourtyEightAbove",
      render: (text, record: any) => (
        <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=gt48&count=${record.fourtyEightAbove}`,
          }}
          target="_blank"
        >
          {text}
        </Link>
      ),
      sorter: (a, b) => a.fourtyEightAbove - b.fourtyEightAbove,
      align: "center",
    },
  ];

  const data2: DataType[] =
    latencyList === null
      ? [
          {
            key: 109020,
            carrier: "random",
            refType: "Booking",
            total: 0,
            zeroToOne: 0,
            oneToTwo: 0,
            twoToFour: 0,
            fourToEight: 0,
            eightToTwelve: 0,
            twelveToSixteen: 0,
            sixteenToTwentyFour: 0,
            twentyFourToFourtyEight: 0,
            fourtyEightAbove: 0,
          },
        ]
      : latencyList.sort(function(a: any, b: any) {
        const nameA = a.carrier.toUpperCase(); // ignore upper and lowercase
        const nameB = b.carrier.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }).map((item: any, index) => {
          let totalCount: number = 0;
          if (item.first !== null && item.first !== undefined) {
            totalCount += +item.first;
          }
          if (item.second !== null && item.second !== undefined) {
            totalCount += +item.second;
          }
          if (item.third !== null && item.third !== undefined) {
            totalCount += +item.third;
          }
          if (item.fourth !== null && item.fourth !== undefined) {
            totalCount += +item.fourth;
          }
          if (item.fifth !== null && item.fifth !== undefined) {
            totalCount += +item.fifth;
          }
          if (item.sixth !== null && item.sixth !== undefined) {
            totalCount += +item.sixth;
          }
          if (item.seventh !== null && item.seventh !== undefined) {
            totalCount += +item.seventh;
          }
          if (item.eight !== null && item.eight !== undefined) {
            totalCount += +item.eight;
          }
          if (item.ninth !== null && item.ninth !== undefined) {
            totalCount += +item.ninth;
          }
          return {
            key: index,
            carrier: item.carrier,
            refType:
              item.refType === "BOOKING_NUMBER"
                ? "Booking"
                : item.refType === "CONTAINER_NUMBER"
                ? "Container"
                : "BillOfLading",
            total: totalCount,
            zeroToOne:
              item.first !== null && item.first !== undefined ? +item.first : 0,
            oneToTwo:
              item.second !== null && item.second !== undefined
                ? +item.second
                : 0,
            twoToFour:
              item.third !== null && item.third !== undefined ? +item.third : 0,
            fourToEight:
              item.fourth !== null && item.fourth !== undefined
                ? +item.fourth
                : 0,
            eightToTwelve:
              item.fifth !== null && item.fifth !== undefined ? +item.fifth : 0,
            twelveToSixteen:
              item.sixth !== null && item.sixth !== undefined ? +item.sixth : 0,
            sixteenToTwentyFour:
              item.seventh !== null && item.seventh !== undefined
                ? +item.seventh
                : 0,
            twentyFourToFourtyEight:
              item.eight !== null && item.eight !== undefined ? +item.eight : 0,
            fourtyEightAbove:
              item.ninth !== null && item.ninth !== undefined ? +item.ninth : 0,
          };
        });
  // const onChange: TableProps<DataType>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data2}
        //onChange={onChange}
        pagination={{ pageSize: 24, disabled: true, hideOnSinglePage: true }}
        scroll={{ x: "1100px", y: "420px" }}
        //style={{height: 600}}
      />
    </div>
  );
};

export default React.memo(Report);
