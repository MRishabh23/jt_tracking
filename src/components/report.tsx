import React from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

export interface DataType {
  key: React.Key;
  carrier: string;
  referenceType: string;
  queue?: string;
  subscriptionId?: string;
  status?: string;
  referenceNumber?: string;
  lastCrawledAt?: string;
  updatedAt?: string;
  createdAt?: string;
  total?: number;
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
  fifth?: number;
  sixth?: number;
  seventh?: number;
  eight?: number;
  ninth?: number;
}

export const latencyCreation = (latencyList: any) => {
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
        referenceType: item.refType,
        total: totalCount,
        first:
          item.first !== null && item.first !== undefined ? +item.first : 0,
        second:
          item.second !== null && item.second !== undefined ? +item.second : 0,
        third:
          item.third !== null && item.third !== undefined ? +item.third : 0,
        fourth:
          item.fourth !== null && item.fourth !== undefined ? +item.fourth : 0,
        fifth:
          item.fifth !== null && item.fifth !== undefined ? +item.fifth : 0,
        sixth:
          item.sixth !== null && item.sixth !== undefined ? +item.sixth : 0,
        seventh:
          item.seventh !== null && item.seventh !== undefined
            ? +item.seventh
            : 0,
        eight:
          item.eight !== null && item.eight !== undefined ? +item.eight : 0,
        ninth:
          item.ninth !== null && item.ninth !== undefined ? +item.ninth : 0,
      };
    });

  return list;
};

export const referenceCreation = (referenceList: any) => {
  const rList = referenceList.map((item: any, index: number) => {
    return {
      key: index,
      carrier: item.carrier,
      referenceType: item.referenceType,
      queue:
        item.queue === "1" && item.error === ""
          ? "NORMAL"
          : item.queue === "2"
          ? "ADAPTIVE"
          : "RNF",
      subscriptionId: item.subscriptionId,
      status: item.status,
      referenceNumber: item.referenceNumber,
      lastCrawledAt: item.lastCrawledAt,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
      error: item.error,
    };
  });
  return rList;
};

const colors = ["geekblue", "green", "volcano"];
const colorStatus = ["green", "red"];
let color: any;

export const getLatencyColumns = (mainList: any) => {
  let carrierL = mainList.map((item: any) => {
    return item.carrier;
  });
  function removeDuplicates(carrierL: []) {
    return [...new Set(carrierL)];
  }
  carrierL = removeDuplicates(carrierL);

  const columns: ColumnsType<DataType> = [
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
      title: "ReferenceType",
      key: "referenceType",
      dataIndex: "referenceType",
      render: (referenceType) => (
        <Tag
          color={
            referenceType.toLowerCase().includes("booking")
              ? colors[0]
              : referenceType.toLowerCase().includes("container")
              ? colors[1]
              : colors[2]
          }
          key={color}
        >
          {referenceType}
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
      onFilter: (value: any, record) => record.referenceType.includes(value),
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
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=total&report=${record.queue}&count=${record.total}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.total - b.total,
      width: 75,
      align: "center",
    },
    {
      title: "0_1",
      dataIndex: "first",
      key: "first",
      render: (text, record: any) =>
        record.first > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=first&report=${record.queue}&count=${record.first}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.first - b.first,
      width: 75,
      align: "center",
    },
    {
      title: "1_2",
      dataIndex: "second",
      key: "second",
      render: (text, record: any) =>
        record.second > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=second&report=${record.queue}&count=${record.second}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.second - b.second,
      width: 75,
      align: "center",
    },
    {
      title: "2_4",
      dataIndex: "third",
      key: "third",
      render: (text, record: any) =>
        record.third > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=third&report=${record.queue}&count=${record.third}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.third - b.third,
      width: 75,
      align: "center",
    },
    {
      title: "4_8",
      dataIndex: "fourth",
      key: "fourth",
      render: (text, record: any) =>
        record.fourth > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=fourth&report=${record.fourth}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.fourth - b.fourth,
      width: 75,
      align: "center",
    },
    {
      title: "8_12",
      dataIndex: "fifth",
      key: "fifth",
      render: (text, record: any) =>
        record.fifth > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=fifth&report=${record.queue}&count=${record.fifth}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.fifth - b.fifth,
      width: 75,
      align: "center",
    },
    {
      title: "12_16",
      dataIndex: "sixth",
      key: "sixth",
      render: (text, record: any) =>
        record.sixth > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=sixth&report=${record.queue}&count=${record.sixth}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.sixth - b.sixth,
      width: 75,
      align: "center",
    },
    {
      title: "16_24",
      dataIndex: "seventh",
      key: "seventh",
      render: (text, record: any) =>
        record.seventh > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=seventh&report=${record.queue}&count=${record.seventh}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.seventh - b.seventh,
      width: 75,
      align: "center",
    },
    {
      title: "24_48",
      dataIndex: "eight",
      key: "eight",
      render: (text, record: any) =>
        record.eight > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=eight&report=${record.queue}&count=${record.eight}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.eight - b.eight,
      width: 75,
      align: "center",
    },
    {
      title: ">48",
      dataIndex: "ninth",
      key: "ninth",
      render: (text, record: any) =>
        record.ninth > 0 ? (
          <Link
            to={{
              pathname: "/reference/list",
              search: `?carrier=${record.carrier}&refType=${record.referenceType}&type=ninth&report=${record.queue}&count=${record.ninth}`,
            }}
            target="_blank"
          >
            {text}
          </Link>
        ) : (
          0
        ),
      sorter: (a: any, b: any) => a.ninth - b.ninth,
      width: 75,
      align: "center",
    },
  ];

  return columns;
};

export const getReferenceColumns = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Subscription Id",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
      fixed: true,
      align: "center",
    },
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      align: "center",
    },
    {
      title: "Reference Type",
      dataIndex: "referenceType",
      key: "referenceType",
      render: (referenceType) => (
        <Tag
          color={
            referenceType.toLowerCase().includes("booking")
              ? colors[0]
              : referenceType.toLowerCase().includes("container")
              ? colors[1]
              : colors[2]
          }
          key={color}
        >
          {referenceType.toUpperCase()}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status == "ACTIVE" ? colorStatus[0] : colorStatus[1]}
          key={color}
        >
          {status.toUpperCase()}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Queue",
      dataIndex: "queue",
      key: "queue",
      align: "center",
    },
    {
      title: "Last Crawled At",
      dataIndex: "lastCrawledAt",
      key: "lastCrawledAt",
      align: "center",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
  ];

  return columns;
};
