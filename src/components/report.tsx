import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { listCreation } from "../routes/ocean/ocean";

interface props {
  latencyList: any;
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

const Report: React.FC<props> = ({ latencyList }) => {
  const colors = ["geekblue", "green", "volcano"];
  let color: any;

  const mainList = listCreation(latencyList)
  console.log(mainList);

  let carrierL = mainList.map((item: any)=> {
      return item.carrier
  })
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
      width: 125,
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record: any) => (
        record.total>0 ? <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=total`,
          }}
          target="_blank"
        >
          {text}
        </Link>  : 0
      ),
      sorter: (a, b) => a.total - b.total,
      align: "center",
    },
    {
      title: "0_1",
      dataIndex: "zeroToOne",
      key: "zeroToOne",
      render: (text, record: any) => (
        record.zeroToOne > 0 ?<Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=first`,
          }}
          target="_blank"
        >
          {text}
        </Link>:0
      ),
      sorter: (a, b) => a.zeroToOne - b.zeroToOne,
      align: "center",
    },
    {
      title: "1_2",
      dataIndex: "oneToTwo",
      key: "oneToTwo",
      render: (text, record: any) => (
        record.oneToTwo > 0 ? <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=second`,
          }}
          target="_blank"
        >
          {text}
        </Link>: 0
      ),
      sorter: (a, b) => a.oneToTwo - b.oneToTwo,
      align: "center",
    },
    {
      title: "2_4",
      dataIndex: "twoToFour",
      key: "twoToFour",
      render: (text, record: any) => (
        record.twoToFour > 0 ? <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=third`,
          }}
          target="_blank"
        >
          {text}
        </Link>:0
      ),
      sorter: (a, b) => a.twoToFour - b.twoToFour,
      align: "center",
    },
    {
      title: "4_8",
      dataIndex: "fourToEight",
      key: "fourToEight",
      render: (text, record: any) => (
        record.fourToEight > 0 ? <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=fourth`,
          }}
          target="_blank"
        >
          {text}
        </Link>: 0
      ),
      sorter: (a, b) => a.fourToEight - b.fourToEight,
      align: "center",
    },
    {
      title: "8_12",
      dataIndex: "eightToTwelve",
      key: "eightToTwelve",
      render: (text, record: any) => (
        record.eightToTwelve > 0 ? <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=fifth`,
          }}
          target="_blank"
        >
          {text}
        </Link>: 0
      ),
      sorter: (a, b) => a.eightToTwelve - b.eightToTwelve,
      align: "center",
    },
    {
      title: "12_16",
      dataIndex: "twelveToSixteen",
      key: "twelveToSixteen",
      render: (text, record: any) => (
        record.twelveToSixteen > 0 ?<Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=sixth`,
          }}
          target="_blank"
        >
          {text}
        </Link>: 0
      ),
      sorter: (a, b) => a.twelveToSixteen - b.twelveToSixteen,
      align: "center",
    },
    {
      title: "16_24",
      dataIndex: "sixteenToTwentyFour",
      key: "sixteenToTwentyFour",
      render: (text, record: any) => (
        record.sixteenToTwentyFour > 0 ? <Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=seventh`,
          }}
          target="_blank"
        >
          {text}
        </Link>: 0
      ),
      sorter: (a, b) => a.sixteenToTwentyFour - b.sixteenToTwentyFour,
      align: "center",
    },
    {
      title: "24_48",
      dataIndex: "twentyFourToFourtyEight",
      key: "twentyFourToFourtyEight",
      render: (text, record: any) => (
        record.twentyFourToFourtyEight > 0 ?<Link
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=eight`,
          }}
          target="_blank"
        >
          {text}
        </Link>: 0
      ),
      sorter: (a, b) => a.twentyFourToFourtyEight - b.twentyFourToFourtyEight,
      align: "center",
    },
    {
      title: ">48",
      dataIndex: "fourtyEightAbove",
      key: "fourtyEightAbove",
      render: (text, record: any) => (
       record.fourtyEightAbove > 0 ? <Link  
          to={{
            pathname: "/reference/list",
            search: `?carrier=${record.carrier}&refType=${record.refType}&type=ninth`,
          }}
          target="_blank"
        >
          {text}
        </Link> : 0
      ),
      sorter: (a, b) => a.fourtyEightAbove - b.fourtyEightAbove,
      align: "center",
    },
  ];

  
  
  const data2: DataType[] =
    latencyList === null || mainList.length === 0
      ? [
          
        ]
      : mainList

  
          

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <Table
        columns={columns}
        dataSource={data2}
        pagination={{ pageSize: 24, disabled: true, hideOnSinglePage: true }}
        scroll={{ x: "1100px", y: "675px" }}
      />
    </div>
  );
};

export default React.memo(Report);
