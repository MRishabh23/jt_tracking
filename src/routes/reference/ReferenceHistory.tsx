import React, { useState, useEffect } from "react";
import { Form, Input, Select, Table } from "antd";
import { useCheckAuth } from "../../api/auth";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { TablePaginationConfig } from "antd";
import {
  DataType,
  HistoryCreation,
  getHistoryColumns,
} from "../../components/report";
import { historyListAction } from "../../store/actions/ocean.action";
import {
  OceanProp,
  useHistoryList,
  useHistoryListCount,
} from "../../api/ocean";

const ReferenceHistory: React.FC = () => {
  useCheckAuth();
  const location = useLocation();
  // const navigate = useNavigate();
  const myParam: any = new URLSearchParams(location.search);
  const gError = useSelector((state: any) => state.ocean.hError);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [currentSubId, setCurrentSubId] = useState("");
  const [historyData, setHistoryData] = useState<OceanProp>({
    mode: "OCEAN",
    type: "REFERENCE_HISTORY",
    subscriptionId:
      myParam.get("subsId") !== undefined &&
      myParam.get("subsId") !== null &&
      myParam.get("subsId") !== ""
        ? myParam.get("subsId").toUpperCase()
        : "",
    history:
      myParam.get("history") !== undefined &&
      myParam.get("history") !== null &&
      myParam.get("history") !== ""
        ? myParam.get("history").toUpperCase()
        : "ALL_HISTORY",
  });

  const { list, loading, tableParams, handleTableChange } =
    useHistoryList(historyData);

  const { count } = useHistoryListCount(
    historyData,
    tableParams.pagination?.current,
    myParam
  );

  const mainList = HistoryCreation(list, currentSubId);
  //  console.log("tabel data", tableData);
  const data2: DataType[] =
    list === null || mainList.length === 0 ? [] : mainList;

  const onFinish = async (values: any) => {
    dispatch(historyListAction({ error: "" }));
    const subsId = values.SubscriptionId;
    setCurrentSubId(subsId);
    const status = values.status === undefined ? "ALL_HISTORY" : values.status;
    const sendData = {
      mode: "OCEAN",
      type: "REFERENCE_HISTORY",
      subscriptionId: subsId,
      history: status,
    };

    setHistoryData(sendData);

    const pagination: TablePaginationConfig = {
      current: 1,
      pageSize: 25,
    };
    handleTableChange(pagination);
  };

  const getHisCol = getHistoryColumns();

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (gError !== "") {
        setError(gError);
      } else {
        setError("");
      }
    }
    return () => {
      ignore = true;
    };
  }, [gError]);

  return (
    // <div>Reference History</div>
    <div className="relative w-full min-h-full p-3">
      <div className="flex items-center justify-center pt-2 font-semibold">
        <h3 className="text-3xl">Crawl History</h3>
      </div>
      <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-12">
        <Form
          name="basic"
          onFinish={onFinish}
          size="middle"
          className="flex flex-col justify-evenly gap-1 pt-3 lg:flex-row lg:gap-2"
          initialValues={{ status: "ALL_HISTORY" }}
        >
          <Form.Item
            label={<p className="text-lg">SubscriptionId</p>}
            name="SubscriptionId"
            className="min-w-[400px] lg:flex mb-3 lg:mb-0"
            rules={[{ required: true, message: "Please input SubscriptionId" }]}
          >
            <Input placeholder="Enter SubscriptionId" />
          </Form.Item>

          <Form.Item
            label={<p className="text-lg">Crawl Status</p>}
            name="status"
            className="min-w-[200px] lg:flex mb-3 lg:mb-0"
          >
            <Select
              // className="w-64"
              placeholder="select crawl status"
              allowClear={true}
            >
              <Select.Option value="DIFF_HISTORY">DIFF HISTORY</Select.Option>
              <Select.Option value="ALL_HISTORY">ALL HISTORY</Select.Option>
              {/* <Select.Option value="rnf">Reference Not Found</Select.Option> */}
            </Select>
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
            >
              Refresh
            </button>
          </Form.Item>
        </Form>
      </div>
      {error !== "" ? (
        <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
          {error.includes("timeout") ? "Request Timeout" : error}
        </div>
      ) : (
        <div className="mt-7">
          <div className="p-4 bg-gray-200 rounded-md">
            <Table
              columns={getHisCol}
              dataSource={data2}
              pagination={{
                current: tableParams.pagination?.current,
                pageSize: tableParams.pagination?.pageSize,
                showSizeChanger: false,
                total: count,
              }}
              loading={loading}
              onChange={handleTableChange}
              scroll={{ x: "1100px", y: "675px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ReferenceHistory);
