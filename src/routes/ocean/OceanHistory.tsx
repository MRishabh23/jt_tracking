import React, { useState } from "react";
import { Form, Input, Modal, Select, Table } from "antd";
import { useCheckAuth } from "../../api/auth";
import { useSearchParams } from "react-router-dom";
import type { TablePaginationConfig } from "antd";
import {
  DataType,
  HistoryCreation,
  getHistoryColumns,
} from "../../components/report";
import {
  useFetchHistoryData,
  useHistoryList,
  useHistoryListCount,
} from "../../api/ocean";
import { FaSpinner } from "react-icons/fa";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

const ReferenceHistory: React.FC = () => {
  useCheckAuth();
  const [form] = Form.useForm();
  const [historyParam, setHistoryParam] =
    useSearchParams();

  const { list, loading, tableParams, handleTableChange, historyError= "" } =
    useHistoryList(historyParam);
  const { count, historyCountError= "" } = useHistoryListCount(
    historyParam,
    tableParams.pagination?.current
  );

  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    data: {
      type: "FETCH_HISTORY",
      mode: "OCEAN",
      subscriptionId: "",
      schId: "",
      resourceId: "",
      jsonType: "",
    },
  });
  const { obj, objLoad, contextHolder } = useFetchHistoryData(isModalOpen.data);

  const mainList = HistoryCreation(list, historyParam.get("subscriptionId") || "");

  const data2: DataType[] =
    list === null || mainList.length === 0 ? [] : mainList;

  const onFinish = async (values: any) => {
    const subsId = values.SubscriptionId;
    const status = values.status === undefined ? "DIFF_HISTORY" : values.status;
    const sendData = {
      subscriptionId: subsId,
      history: status,
    };

    setHistoryParam(sendData);

    const pagination: TablePaginationConfig = {
      current: 1,
      pageSize: 5,
    };
    handleTableChange(pagination);
  };

  const getHisCol = getHistoryColumns(isModalOpen, setIsModalOpen);

  const handleModal = () => {
    setIsModalOpen({
      ...isModalOpen,
      open: !isModalOpen.open,
      data: {
        type: "FETCH_HISTORY",
        mode: "OCEAN",
        subscriptionId: "",
        schId: "",
        resourceId: "",
        jsonType: "",
      },
    });
  };

  const HistoryModal = () => {
    return (
      <Modal
        title={`View Json for Scheduler Id: ${isModalOpen.data.schId}`}
        open={isModalOpen.open}
        closeIcon={false}
        footer={
          <button
            onClick={handleModal}
            className="px-3 py-1 text-white bg-red-500 border border-red-600 rounded-md hover:bg-red-400"
          >
            Close
          </button>
        }
        bodyStyle={{ height: "40rem" }}
        width={"60rem"}
        centered={true}
      >
        <div className="flex w-full h-full">
          <div className="flex-1 p-1 overflow-auto">
            <div className="flex gap-2 text-lg">
              {Object.keys(obj[0]).length > 0 ? (
                <JsonView src={obj[0]} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      {contextHolder}
      <div className="relative w-full min-h-full p-3">
        <div className="flex items-center justify-center pt-2 font-semibold">
          <h3 className="text-3xl">Crawl History</h3>
        </div>
        <div className="p-3 mt-4 bg-gray-200 rounded-md lg:mt-12">
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            size="middle"
            className="flex flex-col gap-4 pt-3 lg:flex-row lg:justify-center lg:gap-6"
            initialValues={{
              status: historyParam.get("history") || "DIFF_HISTORY",
              SubscriptionId: historyParam.get("subscriptionId") || "",
            }}
          >
            <Form.Item
              label={<p className="text-lg">SubscriptionId</p>}
              name="SubscriptionId"
              className="flex-1 mb-0"
              rules={[
                { required: true, message: "Please input SubscriptionId" },
              ]}
            >
              <Input allowClear placeholder="Enter SubscriptionId" />
            </Form.Item>

            <Form.Item
              label={<p className="text-lg">Crawl Status</p>}
              name="status"
              className="flex-1 mb-0"
            >
              <Select placeholder="select crawl status" allowClear={false}>
                <Select.Option value="DIFF_HISTORY">DIFF HISTORY</Select.Option>
                <Select.Option value="ALL_HISTORY">ALL HISTORY</Select.Option>
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
        { historyError !=="" || historyCountError !== ""  ? (
          <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
            {historyError.includes("timeout") ? "Request Timeout" : historyError}
          </div>
        ) : (
          <div className="mt-7">
            <div className="p-4 bg-gray-200 rounded-md">
              {list.length > 0 ? (
                <Table
                  columns={getHisCol}
                  dataSource={data2}
                  pagination={{
                    current: tableParams.pagination?.current,
                    pageSize: tableParams.pagination?.pageSize,
                    showSizeChanger: false,
                    total: count,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    position: ["topRight", "bottomRight"],
                  }}
                  loading={loading}
                  onChange={handleTableChange}
                  scroll={{ x: "1100px", y: "675px" }}
                />
              ) : (
                <>
                  {list.length === 0 && loading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                    </div>
                   ) : list.length === 0 && form.getFieldValue("SubscriptionId")!=="" ?(
                    <p className="flex justify-center text-lg font-semibold text-black">
                      No data!!
                    </p>
                  ):(
                    <p className="flex justify-center text-lg font-semibold text-black">
                      Enter the Subscription Id to see history!
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <div>
          {objLoad ? (
            <div className="absolute z-[999] inset-0 bg-black/10 flex justify-center items-center">
              <div className="flex items-center justify-center">
                <FaSpinner className="text-3xl text-blue-500 animate-spin" />
              </div>
            </div>
          ) : obj.length > 0 ? (
            <HistoryModal />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(ReferenceHistory);
