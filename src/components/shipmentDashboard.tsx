import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface props {
  referenceList: any;
}

interface DataType {
  key: React.Key;
  subscriptionId: number;
  carrier: string;
  status: string;
  referenceType: string;
  queue: string;
  referenceNumber: string,
  lastCrawledAt: string,
  updatedAt: string,
  createdAt: string
}

const ShipmentDashboard: React.FC<props> = ({ referenceList}) => {
  const colorsRef = ["geekblue", "green", "volcano"];
  const colorstatus = ["green", "red"];
  let color: any;
  const data = referenceList;

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
              ? colorsRef[0]
              : referenceType.toLowerCase().includes("container")
                ? colorsRef[1]
                : colorsRef[2]
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
          color={
            status == "ACTIVE"
              ? colorstatus[0]
              : colorstatus[1]

          }
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
    }

  ];

  

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <Table
        columns={columns}
        dataSource={data}
        // pagination={{ pageSize: 25, disabled: true, hideOnSinglePage: true }}
        pagination = {false}
        scroll={{ x: "1100px", y: "675px" }}
      />

    </div>
  );
}

export default React.memo(ShipmentDashboard)
