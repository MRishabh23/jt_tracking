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
  insertionTime?: string;
  crawlStatus?: string;
  schedulerId?: string | number;
  fkJson?: string;
  crawlJson?: string;
  fkLatestJson?: string;
  activeCount?: number;
  successCount?: number;
  successRatio?: number;
  failedCount?: number;
  duration?: number;
  rnfCount?: number;
  diffCount?: number;
  skipped?: number;
  fkTimeout?: number;
  start?: string;
  end?: string;
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

export const HistoryCreation = (historyList: any, subId: string) => {
  const hList = historyList.map((item: any, index: number) => {
    return {
      key: index,
      insertionTime: item.v.insertion_time,
      crawlStatus:
        item.v.crawl_status === undefined ? "No Data" : item.v.crawl_status,
      subscriptionId: subId,
      schedulerId: item.k,
      fkJson:
        item.v.fkMappedJsonResourceId === undefined ||
        item.v.fkMappedJsonResourceId === null ||
        item.v.fkMappedJsonResourceId === "null"
          ? "No Data"
          : item.v.fkMappedJsonResourceId,
      crawlJson:
        item.v.crawledJsonResourceId === undefined ||
        item.v.crawledJsonResourceId === null ||
        item.v.crawledJsonResourceId === "null"
          ? "No Data"
          : item.v.crawledJsonResourceId,
      fkLatestJson:
        item.v.latestFKMappedJsonResourceId == undefined ||
        item.v.latestFKMappedJsonResourceId === null ||
        item.v.latestFKMappedJsonResourceId === "null"
          ? "No Data"
          : item.v.latestFKMappedJsonResourceId,
    };
  });
  return hList;
};

export const SummaryCreation = (summaryList: any) => {
  const sList = summaryList.map((item: any, index: number) => {
    return {
      key: index,
      carrier: item.jtCarrierCode,
      activeCount: item.jtCrawledTotal,
      successCount: item.successCount,
      successRatio: item.successRatio,
      failedCount: item.failCount,
      failedRatio: item.failureRatio,
      duration: item.timeDiffMinutes,
      rnfCount: item.getReferenceNotFound,
      rnfRatio: item.getReferenceNotFoundPercentage,
      diffCount: item.getTotalDiffFound,
      skipped: item.skipped404,
      fkTimeout: item.toFKFailed,
      start: item.start_time,
      end: item.end_time,
      schedulerId: item.schedulerId,
      queue: item.queueType,
    };
  });
  return sList;
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
              pathname: "/ocean/list",
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
      render: (subscriptionId, record: any) =>
        record.subscriptionId !== "" ? (
          <Link
            to={{
              pathname: "/ocean/history",
              search: `?subsId=${record.subscriptionId}`,
            }}
            target="_blank"
          >
            {subscriptionId}
          </Link>
        ) : (
          subscriptionId
        ),
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

export const getHistoryColumns = (isModalOpen: any, setIsModalOpen: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Subscription Id",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
      fixed: true,
      align: "center",
    },
    {
      title: "Insertion Time",
      dataIndex: "insertionTime",
      key: "insertionTime",
      align: "center",
    },
    {
      title: "Crawl Status",
      dataIndex: "crawlStatus",
      key: "crawlStatus",
      render: (crawlStatus) => (
        <Tag
          color={crawlStatus == "SUCCESS" ? colorStatus[0] : colorStatus[1]}
          key={color}
        >
          {crawlStatus.toUpperCase()}
        </Tag>
      ),
      align: "center",
    },
    {
      title: "Scheduler Id",
      dataIndex: "schedulerId",
      key: "schedulerId",
      render: (schedulerId, record) =>
        record.crawlJson !== "No Data" ? (
          <button
            key={schedulerId}
            onClick={() =>
              setIsModalOpen({
                ...isModalOpen,
                open: true,
                data: {
                  type: "FETCH_HISTORY",
                  mode: "OCEAN",
                  subscriptionId: record.subscriptionId,
                  schId: record.schedulerId,
                },
              })
            }
            className="px-3 py-1 text-white bg-blue-500 border border-blue-600 rounded-md hover:bg-blue-400"
          >
            {schedulerId}
          </button>
        ) : (
          schedulerId
        ),
      align: "center",
    },
    {
      title: "FK Json",
      dataIndex: "fkJson",
      key: "fkJson",
      render: (fkJson, record, index) =>
        record.fkJson !== "No Data" &&
        record.fkJson === "SAME_PAYLOAD" &&
        record.fkLatestJson !== "No Data" ? (
          <button
            key={`${index} + ${record.schedulerId}`}
            onClick={() =>
              setIsModalOpen({
                ...isModalOpen,
                open: true,
                data: {
                  type: "FETCH_HISTORY",
                  mode: "OCEAN",
                  resourceId: record.fkLatestJson,
                  jsonType: "FK",
                  schId: record.schedulerId,
                },
              })
            }
            className="px-3 py-1 border rounded-md text-blue bg-amber-300 border-amber-400 hover:bg-amber-200"
          >
            SAME_AS_BEFORE
          </button>
        ) : record.fkJson !== "No Data" && record.fkJson !== "SAME_PAYLOAD" ? (
          <button
            key={fkJson + record.schedulerId}
            onClick={() =>
              setIsModalOpen({
                ...isModalOpen,
                open: true,
                data: {
                  type: "FETCH_HISTORY",
                  mode: "OCEAN",
                  resourceId: record.fkJson,
                  jsonType: "FK",
                  schId: record.schedulerId,
                },
              })
            }
            className="px-3 py-1 text-white bg-green-500 border border-green-600 rounded-md hover:bg-green-400"
          >
            NEW_EVENTS_FOUND
          </button>
        ) : (
          fkJson
        ),
      align: "center",
    },
    {
      title: "Crawl Json",
      dataIndex: "crawlJson",
      key: "crawlJson",
      render: (crawlJson, record) =>
        record.crawlJson !== "No Data" && record.fkJson === "SAME_PAYLOAD" ? (
          <button
            key={crawlJson + record.schedulerId}
            onClick={() =>
              setIsModalOpen({
                ...isModalOpen,
                open: true,
                data: {
                  type: "FETCH_HISTORY",
                  mode: "OCEAN",
                  resourceId: record.crawlJson,
                  jsonType: "Crawl",
                  schId: record.schedulerId,
                },
              })
            }
            className="px-3 py-1 border rounded-md text-blue bg-amber-300 border-amber-400 hover:bg-amber-200"
          >
            SAME_AS_BEFORE
          </button>
        ) : record.crawlJson !== "No Data" && record.fkJson === "No Data" ? (
          <button
            key={crawlJson + record.schedulerId}
            onClick={() =>
              setIsModalOpen({
                ...isModalOpen,
                open: true,
                data: {
                  type: "FETCH_HISTORY",
                  mode: "OCEAN",
                  resourceId: record.crawlJson,
                  jsonType: "Crawl",
                  schId: record.schedulerId,
                },
              })
            }
            className="px-3 py-1 text-white bg-blue-500 border border-blue-600 rounded-md hover:bg-blue-400"
          >
            CRAWL_JSON
          </button>
        ) : record.crawlJson !== "No Data" &&
          record.fkJson !== "No Data" &&
          record.fkJson !== "SAME_PAYLOAD" ? (
          <button
            key={crawlJson + record.schedulerId}
            onClick={() =>
              setIsModalOpen({
                ...isModalOpen,
                open: true,
                data: {
                  type: "FETCH_HISTORY",
                  mode: "OCEAN",
                  resourceId: record.crawlJson,
                  jsonType: "Crawl",
                  schId: record.schedulerId,
                },
              })
            }
            className="px-3 py-1 text-white bg-green-500 border border-green-600 rounded-md hover:bg-green-400"
          >
            NEW_EVENTS_FOUND
          </button>
        ) : (
          crawlJson
        ),
      align: "center",
    },
  ];

  return columns;
};

export const getSummaryColumns = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Carrier",
      dataIndex: "carrier",
      key: "carrier",
      fixed: true,
      align: "center",
      width: 120,
    },
    {
      title: "Active",
      dataIndex: "activeCount",
      key: "activeCount",
      align: "center",
      width: 120,
    },
    {
      title: "Success",
      dataIndex: "successCount",
      key: "successCount",
      align: "center",
      render: (successCount, record: any) => (
        <p>
          {successCount} ({record.successRatio}%)
        </p>
      ),
      width: 120,
    },
    {
      title: "Fail",
      dataIndex: "failedCount",
      key: "failedCount",
      align: "center",
      render: (failedCount, record: any) => (
        <p style={{ color: record.failedRatio>5 ? 'red' : 'inherit' }}>
          {failedCount} ({record.failedRatio}%)
        </p>
      ),
      width: 120,
    },
    {
      title: "Duration (mins)",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      width: 120,
    },
    {
      title: "RNF (404)",
      dataIndex: "rnfCount",
      key: "rnfCount",
      align: "center",
      render: (rnfCount, record: any) => (
        <p style={{ color: record.rnfRatio>20 ? 'red' : 'inherit' }}>
          {rnfCount} ({record.rnfRatio}%)
        </p>
      ),
      width: 120,
    },
    {
      title: "Diff",
      dataIndex: "diffCount",
      key: "diffCount",
      align: "center",
      width: 120,
    },
    {
      title: "Skipped (404)",
      dataIndex: "skipped",
      key: "skipped",
      align: "center",
      width: 120,
    },
    {
      title: "FK Timeout",
      dataIndex: "fkTimeout",
      key: "fkTimeout",
      align: "center",
      width: 120,
    },
    {
      title: "Start-Time",
      dataIndex: "start",
      key: "start",
      align: "center",
      width: 120,
    },
    {
      title: "End-Time",
      dataIndex: "end",
      key: "end",
      align: "center",
      width: 120,
    },
    {
      title: "Scheduler Id",
      dataIndex: "schedulerId",
      key: "schedulerId",
      align: "center",
      width: 120,
    },
    {
      title: "Queue",
      dataIndex: "queue",
      key: "queue",
      align: "center",
      width: 120,
    },
  ];

  return columns;
};
