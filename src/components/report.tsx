import React from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

export interface LatencyDataType {
  key: React.Key;
  carrier: string;
  queue: string;
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

export const listCreation = (latencyList: any) => {
  const list = latencyList
    .sort(function (a: any, b: any) {
      const nameA = a.carrier.toUpperCase(); // ignore upper and lowercase
      const nameB = b.carrier.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .map((item: any, index: number) => {
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
        queue: item.queue,
        refType: item.refType,
        total: totalCount,
        zeroToOne:
          item.first !== null && item.first !== undefined ? +item.first : 0,
        oneToTwo:
          item.second !== null && item.second !== undefined ? +item.second : 0,
        twoToFour:
          item.third !== null && item.third !== undefined ? +item.third : 0,
        fourToEight:
          item.fourth !== null && item.fourth !== undefined ? +item.fourth : 0,
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

  return list;
};

const colors = ["geekblue", "green", "volcano"];
let color: any;

export const getLatencyColumns = (mainList: any) => {
  let carrierL = mainList.map((item: any) => {
    return item.carrier;
  });
  function removeDuplicates(carrierL: []) {
    return [...new Set(carrierL)];
  }
  carrierL = removeDuplicates(carrierL);

  const columns: ColumnsType<LatencyDataType> = [
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      filters:
        carrierL !== null
          ? carrierL.map((item: string) => {
              return {
                text: item,
                value: item,
              };
            })
          : [],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.carrier.includes(value),
      fixed: true,
      width: 125,
      align: "center",
    },
    {
      title: "RefType",
      key: "refType",
      dataIndex: "refType",
      render: (refType) => (
        <Tag
          color={
            refType.toLowerCase().includes("booking")
              ? colors[0]
              : refType.toLowerCase().includes("container")
              ? colors[1]
              : colors[2]
          }
          key={color}
        >
          {refType}
        </Tag>
      ),
      filters: [
        {
          text: "BOOKING_NUMBER",
          value: "BOOKING_NUMBER",
        },
        {
          text: "BILL_OF_LADING",
          value: "BILL_OF_LADING",
        },
        {
          text: "CONTAINER_NUMBER",
          value: "CONTAINER_NUMBER",
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record) => record.refType.includes(value),
      fixed: true,
      width: 130,
      align: "center",
    },
    {
      title: "Queue",
      key: "queue",
      dataIndex: "queue",
      fixed: true,
      width: 90,
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record: any) =>
        record.total > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=total&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.total - b.total,
      width: 75,
      align: "center",
    },
    {
      title: "0_1",
      dataIndex: "zeroToOne",
      key: "zeroToOne",
      render: (text, record: any) =>
        record.zeroToOne > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=first&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.zeroToOne - b.zeroToOne,
      width: 75,
      align: "center",
    },
    {
      title: "1_2",
      dataIndex: "oneToTwo",
      key: "oneToTwo",
      render: (text, record: any) =>
        record.oneToTwo > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=second&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.oneToTwo - b.oneToTwo,
      width: 75,
      align: "center",
    },
    {
      title: "2_4",
      dataIndex: "twoToFour",
      key: "twoToFour",
      render: (text, record: any) =>
        record.twoToFour > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=third&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.twoToFour - b.twoToFour,
      width: 75,
      align: "center",
    },
    {
      title: "4_8",
      dataIndex: "fourToEight",
      key: "fourToEight",
      render: (text, record: any) =>
        record.fourToEight > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=fourth&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.fourToEight - b.fourToEight,
      width: 75,
      align: "center",
    },
    {
      title: "8_12",
      dataIndex: "eightToTwelve",
      key: "eightToTwelve",
      render: (text, record: any) =>
        record.eightToTwelve > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=fifth&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.eightToTwelve - b.eightToTwelve,
      width: 75,
      align: "center",
    },
    {
      title: "12_16",
      dataIndex: "twelveToSixteen",
      key: "twelveToSixteen",
      render: (text, record: any) =>
        record.twelveToSixteen > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=sixth&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.twelveToSixteen - b.twelveToSixteen,
      width: 75,
      align: "center",
    },
    {
      title: "16_24",
      dataIndex: "sixteenToTwentyFour",
      key: "sixteenToTwentyFour",
      render: (text, record: any) =>
        record.sixteenToTwentyFour > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=seventh&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.sixteenToTwentyFour - b.sixteenToTwentyFour,
      width: 75,
      align: "center",
    },
    {
      title: "24_48",
      dataIndex: "twentyFourToFourtyEight",
      key: "twentyFourToFourtyEight",
      render: (text, record: any) =>
        record.twentyFourToFourtyEight > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=eight&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.twentyFourToFourtyEight - b.twentyFourToFourtyEight,
      width: 75,
      align: "center",
    },
    {
      title: ">48",
      dataIndex: "fourtyEightAbove",
      key: "fourtyEightAbove",
      render: (text, record: any) =>
        record.fourtyEightAbove > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.refType}&type=ninth&report=${record.queue}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a, b) => a.fourtyEightAbove - b.fourtyEightAbove,
      width: 75,
      align: "center",
    },
  ];

  return columns;
};
