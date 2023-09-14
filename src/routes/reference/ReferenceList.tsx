import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Drawer,
  Space,
  Select,
  Spin,
  Tooltip,
  Pagination,
} from "antd";
import ShipmentDashboard from "../../components/shipmentDashboard";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { oceanCalls } from "../../api/oceanApi";
import type { PaginationProps } from "antd";
import { carrierListAction } from "../../store/actions/ocean.action";
import { referenceList } from "../ocean/ocean";
import { useLocation, useNavigate } from "react-router-dom";

const customDrawerStyle = {
  backgroundColor: "rgb(212 212 216)",
};

const ReferenceList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const myParam: any = new URLSearchParams(location.search);

  const cList = useSelector((state: any) => state.ocean.carrierList);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isBulk, setIsBulk] = useState("false");
  const [form1] = Form.useForm();
  const [load, setLoad] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [frame, setFrame] = useState("default");
  const [filterValues, setFilterValues] = useState({});
  const [msgErr, setMsgErr] = useState("");
  const [list, setList] = useState([]);

  const getParamList = async (paramData: any) => {
    setLoad(false);
    setMsgErr("");
    if (page === 1 && count === 0) {
      const sendDataCount = {
        ...paramData,
        totalRecordCount: "true",
      };
      const { limit, page, ...countData } = sendDataCount;
      await oceanCalls(countData)
        .then((res) => {
          const result = res.data;
          if (res.status === 200 && result.statusCode === "200") {
            setCount(res.data.response[0].count);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setMsgErr(err.message);
          setList([]);
          setLoad(true);
        });
    }
    await oceanCalls(paramData)
      .then((res) => {
        const result = res.data;
        if (res.status === 200 && result.statusCode === "200") {
          const refList: any = referenceList(result.response);
          setList(refList);
          setLoad(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch(() => {
        setList([]);
        setLoad(true);
      });
  };

  const carrierFunction = async () => {
    const sendData = {
      list: "carrierList",
    };

    const data = {
      carrierList: [],
      hasError: false,
      errorMsg: "",
    };

    await oceanCalls(sendData)
      .then((res) => {
        const result = res.data;
        if (result.statusCode === "200") {
          data.carrierList = result.response.sort();
          dispatch(carrierListAction(data));
        } else {
          throw { message: result.response };
        }
      })
      .catch((err) => {
        data.hasError = true;
        data.errorMsg = err.message;
        setMsgErr(err.message);
        dispatch(carrierListAction(data));
      });
  };

  const onFinish = async (values: any) => {
    setMsgErr("");
    setOpen(false);
    form.resetFields();
    if (frame !== "filter") {
      setFrame("filter");
    }
    setPage(1);
    setCount(0);
    setFilterValues(values);
  };

  const getFilterList = async (values: any) => {
    const carrier = values.carrier;
    const active = values.active === undefined ? "yes" : values.active;
    const refType = values.refType === undefined ? "" : values.refType;
    const crawlQueue = values.crawlQueue === undefined ? "" : values.crawlQueue;

    const sendData = {
      mode: "ocean",
      type: "referenceList",
      report: crawlQueue,
      carriers: [carrier],
      referenceType: refType,
      timeCategory: "",
      active: active,
      limit: 25,
      page: page,
    };
    setLoad(false);
    if (page === 1 && count === 0) {
      const sendDataCount = {
        mode: "ocean",
        type: "referenceList",
        report: crawlQueue,
        carriers: [carrier],
        referenceType: refType,
        timeCategory: "",
        active: active,
        totalRecordCount: "true",
      };
      await oceanCalls(sendDataCount)
        .then((res) => {
          const result = res.data;
          if (res.status === 200 && result.statusCode === "200") {
            setCount(res.data.response[0].count);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setMsgErr(err.message);
          setList([]);
          setLoad(true);
        });
    }
    await oceanCalls(sendData)
      .then((res) => {
        const result = res.data;
        if (res.status === 200 && result.statusCode === "200") {
          const refList: any = referenceList(result.response);
          setList(refList);
          setLoad(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setMsgErr(err.message);
        setList([]);
        setLoad(true);
      });
  };

  const onFinishSearch = async (value: any) => {
    setMsgErr("");
    form1.resetFields();
    const subId = value.SubscriptionId;

    const sendData = {
      mode: "ocean",
      type: "referenceList",
      searchQuery: subId,
    };
    setIsModalOpen(false);
    setLoad(false);
    setPage(1);
    setCount(0);
    await oceanCalls(sendData)
      .then((res) => {
        const result = res.data;
        if (res.status === 200 && result.statusCode === "200") {
          const refList: any = referenceList(result.response);
          setList(refList);
          setLoad(true);
          setFrame("search");
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setMsgErr(err.message);
        setList([]);
        setLoad(true);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getList = async () => {
    const sendData = {
      mode: "ocean",
      type: "referenceList",
      report: "normal",
      carriers: ["acl"],
      referenceType: "",
      timeCategory: "",
      active: "all",
      limit: 25,
      page: page,
    };
    setLoad(false);
    if (page === 1 && count === 0) {
      const sendDataCount = {
        mode: "ocean",
        type: "referenceList",
        report: "normal",
        carriers: ["acl"],
        referenceType: "",
        timeCategory: "",
        active: "all",
        totalRecordCount: "true",
      };
      await oceanCalls(sendDataCount)
        .then((res) => {
          const result = res.data;
          if (res.status === 200 && result.statusCode === "200") {
            setCount(res.data.response[0].count);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setMsgErr(err.message);
          setList([]);
          setLoad(true);
        });
    }

    await oceanCalls(sendData)
      .then((res) => {
        const result = res.data;
        if (res.status === 200 && result.statusCode === "200") {
          const refList: any = referenceList(result.response);
          setList(refList);
          setLoad(true);
        } else {
          throw { message: res.message };
        }
      })
      .catch((err) => {
        setMsgErr(err.message);
        setList([]);
        setLoad(true);
      });
  };

  const onChange: PaginationProps["onChange"] = async (page) => {
    setPage(page);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (cList.length === 0) {
      carrierFunction();
    }

    if (myParam.size !== 0) {
      const paramdata = {
        mode: "ocean",
        type: "referenceList",
        report: myParam.get("report"),
        carriers: [myParam.get("carrier")],
        referenceType: myParam.get("refType"),
        timeCategory: myParam.get("type"),
        active: "yes",
        limit: 25,
        page: page,
      };
    
      setFrame("param");
      getParamList(paramdata);
    } else if (frame === "default") {
      getList();
    } else if (frame === "filter") {
      getFilterList(filterValues);
    }

    return () => controller.abort();
  }, [page, filterValues]);

  return (
    <div className="relative w-full min-h-full p-3">
      <div className="flex items-center justify-center pt-2 font-semibold">
        <h3 className="text-3xl">Reference List</h3>
      </div>
      <div className="flex p-5 mt-8 bg-gray-200 rounded-md justify-evenly lg:mt-12">
        {myParam.size === 0 ? (
          <>
            <Tooltip title="Search using SubscriptionId">
              <button
                type="button"
                onClick={showModal}
                className="py-2 w-40 flex items-center justify-center text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
              >
                <SearchOutlined className="mr-2" />
                Search
              </button>
            </Tooltip>
            <button
              type="button"
              onClick={showDrawer}
              className="py-2 w-40 flex items-center justify-center text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
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
      {msgErr !== "" ? (
        <div className="flex items-center justify-center h-full py-3 mt-5 text-2xl font-medium bg-red-100 rounded-md">
          {msgErr.includes("timeout") ? "Request Timeout" : msgErr}
        </div>
      ) : (
        <div className="mt-7">
          <div className="p-4 bg-gray-200 rounded-md">
            {load ? (
              <ShipmentDashboard referenceList={list} />
            ) : (
              <div className="flex items-center justify-center">
                <Spin tip="Loading..." size="large">
                  <div className="p-12 bg-gray-300 rounded-[4px]" />
                </Spin>
              </div>
            )}
            {frame !== "search" ? (
              <Pagination
                pageSize={25}
                current={page}
                onChange={onChange}
                total={count}
                simple={false}
                showSizeChanger={false}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      <Modal
        title="Search"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Search"
      >
        <Form
          name="search"
          form={form}
          initialValues={{ SubscriptionId: "" }}
          onFinish={onFinishSearch}
        >
          <Form.Item
            label={<p className="text-lg">SubscriptionId</p>}
            name="SubscriptionId"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            rules={[{ required: true, message: "Enter the SubscriptionId" }]}
          >
            <Input
              allowClear
              autoComplete="off"
              placeholder="Enter SubscriptionId"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Filter"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        style={customDrawerStyle}
        extra={
          <Space>
            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={onClose}
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
            active: "all",
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
              onChange={(value) => {
                console.log(value);
                if (value === "hapag" || value === "cma-cgm" || value === "msc" || value === "evergreen" || value === "maersk") {
                  setIsBulk("true")
                }
                else {
                  setIsBulk("false");
                }
              }
              }
            >
              {cList.length > 0 ? (
                cList.map((item: any, index: any) => (
                  <Select.Option key={index} value={`${item.toLowerCase()}`}>
                    {item}
                  </Select.Option>
                ))
              ) : (
                <Select.Option value="loading...">
                  <Spin tip="Loading..." size="small">
                    <div className="p-12 bg-stone-100 rounded-[4px]" />
                  </Spin>
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Reference</p>}
            name="refType"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            rules={isBulk === "true" ? [{ required: true, message: "Please input reference type!" }] : []}
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
              <Select.Option value="normal">Normal</Select.Option>
              <Select.Option value="adaptive">Adaptive</Select.Option>
              <Select.Option value="notFound">Not found</Select.Option>
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
