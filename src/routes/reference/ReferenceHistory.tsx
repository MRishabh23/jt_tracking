import React, {useState}from 'react'
import { Button, Modal, Form, Input, Drawer, Space, Select, Spin, Tooltip } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";

//import { useSearchParams, useLocation } from 'react-router-dom'
const customDrawerStyle = {
  backgroundColor: "rgb(212 212 216)"
};

const ReferenceHistory: React.FC = () => {
  const cList = useSelector((state: any) => state.ocean.carrierList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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

  const onFinishSearch = (value: any) => {
    console.log(value.SubscriptionId);
    setIsModalOpen(false);
  }

  const onFinish = (values: any) => {
    const carrier = values.carrier;
    const active = values.active=== undefined? "":values.active;
    const refType = values.refType===undefined?"":values.refType;
    const crawlQueue = values.crawlQueue===undefined?"":values.crawlQueue;
    console.log(carrier, active, refType, crawlQueue);
    setOpen(false);
  }
    //const [searchParams, setSearchParams] = useSearchParams();
    //const location = useLocation();
    // Get a specific query parameter
    //const myParam = new URLSearchParams(location.search).get('myParam');
    // const myParam = new URLSearchParams(location.search);
    // console.log("my params", myParam)
    // console.log("my params total", myParam.get('total'))
  return (
    <div className="w-full p-3 relative min-h-full">      
      <div className="flex items-center justify-center font-semibold pt-2">
        <h3 className="text-3xl">Reference History</h3>
      </div>
      <div className="flex justify-evenly  p-5 mt-8 bg-gray-200 rounded-md lg:mt-12">
        <Tooltip title="Search using SubscriptionId">
          <Button type="primary" size="large" className="w-40 flex items-center justify-center" onClick={showModal} >
            <SearchOutlined className="mr-2" /> 
            Search
          </Button>
        </Tooltip>
        <Button type="primary" className="w-40" size="large" onClick={showDrawer}>Filter</Button>
      </div>
      <Modal title="Search" open={isModalOpen} onOk={form.submit} onCancel={handleCancel} okText="Search">
        <Form
        name="search"
        form={form}
        onFinish={onFinishSearch}
        >
          <Form.Item
            label={<p className="text-lg">SubscriptionId</p>}
            name="SubscriptionId"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            rules={[{ required: true, message: "Enter the SubscriptionId" }]}
          >
            <Input allowClear autoComplete="off" placeholder="Enter SubscriptionId" />
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
            <Button type="text" shape="circle" icon={<CloseOutlined />} onClick={onClose} className="flex items-center justify-center"></Button>
          </Space>
        }
      >
        <Form className='flex flex-col gap-6' name="basic" onFinish={onFinish}>
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
              {cList.length > 0 ? (
                cList.map((item: any, index: any) => (
                  <Select.Option
                    key={index}
                    value={`${item.toLowerCase()}`}
                  >
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
          >
            <Select
              placeholder="select reference type..."
              allowClear={true}
            >
              <Select.Option value="booking">Booking</Select.Option>
              <Select.Option value="bol">BillOfLading</Select.Option>
              <Select.Option value="container">Container</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="text-lg">Active</p>}
            name="active"
            className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
          >
            <Select
              placeholder="Select active status..."
              allowClear={true}
            >
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
            <Select
              placeholder="select crawl queue type..."
              allowClear={true}
            >
              <Select.Option value="regular">Regular</Select.Option>
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
  )
}

export default React.memo(ReferenceHistory)