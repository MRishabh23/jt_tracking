import React, { useState, useEffect } from "react";
import { Button, Form, Input, Drawer, Space, Select, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { OceanProp, useCarrierList, useReferenceList } from "../../api/ocean";
import { referenceListAction } from "../../store/actions/ocean.action";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DataType,
  getReferenceColumns,
  referenceCreation,
} from "../../components/report";
import { useCheckAuth } from "../../api/auth";
import { FaSpinner } from "react-icons/fa";

const { Search } = Input;

const customDrawerStyle = {
  backgroundColor: "rgb(212 212 216)",
};

const ReferenceList: React.FC = () => {
  useCheckAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const myParam: any = new URLSearchParams(location.search);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const gError = useSelector((state: any) => state.ocean.rError);
  const [refData, setRefData] = useState<OceanProp>({
    mode: "OCEAN",
    type: "REFERENCE_LIST",
    report:
      myParam.get("report") !== undefined &&
      myParam.get("report") !== null &&
      myParam.get("report") !== ""
        ? myParam.get("report").toUpperCase()
        : "",
    carriers:
      myParam.get("carrier") !== undefined &&
      myParam.get("carrier") !== null &&
      myParam.get("carrier") !== ""
        ? [myParam.get("carrier")]
        : ["acl"],
    referenceType:
      myParam.get("refType") !== undefined &&
      myParam.get("refType") !== null &&
      myParam.get("refType") !== ""
        ? myParam.get("refType")
        : "",
    timeCategory:
      myParam.get("type") !== undefined &&
      myParam.get("type") !== null &&
      myParam.get("type") !== ""
        ? myParam.get("type")
        : "",
    active:
      myParam.get("carrier") !== undefined &&
      myParam.get("carrier") !== null &&
      myParam.get("carrier") !== ""
        ? "yes"
        : "yes",
  });
  const { carrierList } = useCarrierList();
  const { list, loading, frame, page, handlePageChange, handlePageReset } =
    useReferenceList(refData);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const mainList = referenceCreation(list);
  const getRefCol = getReferenceColumns();

  const data2: DataType[] =
    list === null || mainList.length === 0 ? [] : mainList;

  const onFinish = async (values: any) => {
    dispatch(referenceListAction({ error: "" }));
    setOpen(false);
    form.resetFields();
    const carrier = values.carrier;
    const active = values.active === undefined ? "yes" : values.active;
    const refType = values.refType === undefined ? "" : values.refType;
    const crawlQueue = values.crawlQueue === undefined ? "" : values.crawlQueue;

    const sendData = {
      mode: "OCEAN",
      type: "REFERENCE_LIST",
      report: crawlQueue,
      carriers: [carrier],
      referenceType: refType,
      timeCategory: "",
      active: active,
    };
    setRefData(sendData);
    handlePageReset();
  };

  const onFinishSearch = async (value: any) => {
    dispatch(referenceListAction({ error: "" }));
    form1.resetFields();
    const subId = value.SubscriptionId;

    const sendData = {
      mode: "OCEAN",
      type: "REFERENCE_LIST",
      searchQuery: subId,
    };
    setRefData(sendData);
    handlePageReset();
  };

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

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
    <div className="relative w-full min-h-full p-3">
      <div className="flex items-center justify-center pt-2 font-semibold">
        <h3 className="text-3xl">Reference List</h3>
      </div>
      <div className="flex flex-col items-center justify-around p-5 mt-8 bg-gray-200 rounded-md xms:flex-row lg:mt-12">
        {myParam.size === 0 ? (
          <>
            <Form
              name="search"
              form={form}
              initialValues={{ SubscriptionId: "" }}
              onFinish={onFinishSearch}
            >
              <Form.Item name="SubscriptionId" className="mb-0">
                <Search
                  className="w-full xms:w-[350px]"
                  allowClear
                  autoComplete="off"
                  placeholder="Enter SubscriptionId"
                  enterButton="Search"
                  size="large"
                  onSearch={form.submit}
                />
              </Form.Item>
            </Form>
            <button
              type="button"
              onClick={handleDrawer}
              className="w-20 h-10 mt-5 xms:mt-0 flex items-center justify-center text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
            >
              Filter
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              navigate("/reference/list");
              window.location.reload();
            }}
            className="px-4 py-1 w-40 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
          >
            Default List
          </button>
        )}
      </div>
      {error !== "" ? (
        <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
          {error.includes("timeout") ? "Request Timeout" : error}
        </div>
      ) : (
        <div className="mt-7">
          <div className=" p-4 bg-gray-200 rounded-md">
            <Table
              columns={getRefCol}
              dataSource={data2}
              loading={loading}
              pagination={false}
              scroll={{ x: "1100px", y: "675px" }}
              footer={() =>
                frame !== "search" ? (
                  <div className="mt-2 flex justify-end items-center">
                    <button
                     type="button"
                      disabled={page === 1 ? true : false}
                      onClick={() => handlePageChange("prev")}
                      className={`px-4 py-1 w-auto rounded-md text-white border-[1px] ${page === 1 ? 'bg-blue-500/70 cursor-not-allowed' : 'bg-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500'}`}
                    >
                      Prev
                    </button>
                    <span
                    className="mx-2 px-2 font-semibold text-lg"
                    >
                    {page}
                    </span>
                    <button
                    type="button"
                      disabled={data2.length < 10 ? true : false}
                      onClick={() => handlePageChange("next")}
                      className={`px-4 py-1 w-auto rounded-md text-white border-[1px] ${data2.length < 10 ? 'bg-blue-500/70 cursor-not-allowed' : 'bg-blue-500 hover:bg-white hover:border-blue-500 hover:text-blue-500'}`}
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <></>
                )
              }
            />
          </div>
        </div>
      )}
      <Drawer
        title="Filter"
        placement="right"
        closable={false}
        onClose={handleDrawer}
        open={open}
        getContainer={false}
        style={customDrawerStyle}
        extra={
          <Space>
            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={handleDrawer}
              className="flex items-center justify-center"
            ></Button>
          </Space>
        }
      >
        <Form
          className="flex flex-col gap-6"
          name="basic"
          onFinish={onFinish}
          initialValues={{
            carrier: "",
            refType: "",
            active: "yes",
            crawlQueue: "",
          }}
          form={form1}
        >
          <Form.Item
            label={<p className="text-lg text-left">Carrier</p>}
            name="carrier"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            rules={[{ required: true, message: "Please input carrier!" }]}
          >
            <Select
              allowClear={true}
              placeholder="select carrier..."
             
            >
              {carrierList.length > 0 ? (
                carrierList.map((item: any, index: any) => (
                  <Select.Option key={index} value={`${item.toLowerCase()}`}>
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
            label={<p className="text-lg">Reference</p>}
            name="refType"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
           
          >
            <Select placeholder="select reference type..." allowClear={true}>
              <Select.Option value="BOOKING_NUMBER">Booking</Select.Option>
              <Select.Option value="BILL_OF_LADING">BillOfLading</Select.Option>
              <Select.Option value="CONTAINER_NUMBER">Container</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Active</p>}
            name="active"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select placeholder="Select active status..." allowClear={true}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="yes">Yes</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Crawl Queue</p>}
            name="crawlQueue"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select placeholder="select crawl queue type..." allowClear={true}>
              <Select.Option value="NORMAL">Normal</Select.Option>
              <Select.Option value="ADAPTIVE">Adaptive</Select.Option>
              <Select.Option value="RNF">Not found</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div className="text-center mt-[1rem]">
              <button
                type="submit"
                className="px-4 py-1 w-[8rem] text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                Filter
              </button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default React.memo(ReferenceList);
