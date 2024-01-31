import React, { useEffect, useState } from "react";
import { Table, Tabs, Form, Select, Modal, Input } from "antd";
import type { TabsProps } from "antd";
import {
  carriers,
  getOceanCarriers,
  getCurrentIncident,
} from "../../data/carrierList";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import {
  useCarrierList,
  useCurrentItemsList,
  usePastItemsList,
} from "../../api/ocean";
import { FaSpinner } from "react-icons/fa";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { fetchPastIncidents } from "../../data/carrierList";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/lib/form/Form";
import { getCarrierStatusColumns } from "../../components/report";
import formatDate from "../../Usables/dateFormat";
import dayjs from "dayjs";

const OceanStatus: React.FC = () => {
  const { token } = theme.useToken();
  const { loading, currentTable } = useCurrentItemsList();
  const [formModal] = useForm();
  const { carrierList } = useCarrierList();
  const [selectedCarrier, setSelectedCarrier] = useState<any[]>([]);
  const [pastItems, setPastItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pastTable } = usePastItemsList();

  const dateFormat = "YYYY/MM/DD";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const onFinishEdit = (item: any) => {
  // }

  const genExtra = (item: any) => {
    return (
      <>
        <button
          className="bg-slate-200 hover:bg-slate-300 text-black hover:text-black font-bold px-4 py-1 rounded border border-slate-600"
          onClick={(event: any) => {
            formModal.setFieldsValue({
              carrier: item.carrier,
              reportedOn: item.reportedOn.split(" ")[0],
              latestUpdate: item.update,
              issue: item.issue,
              eta: dayjs(item.eta),
            });
            showModal();
            event.stopPropagation();
          }}
        >
          Edit
        </button>
        <Modal
          title="Edit Incident"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            labelCol={{ span: 6 }}
            form={formModal}
            layout="horizontal"
            style={{ maxWidth: 600 }}
          >
            <div className="my-4"></div>
            <Form.Item name="carrier" label="Carrier">
              <Input disabled />
            </Form.Item>
            <Form.Item name="reportedOn" label="Reported On">
              <Input disabled />
            </Form.Item>
            <Form.Item name="latestUpdate" label="Latest Update">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item name="issue" label="Issue">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item name="eta" label="ETA">
                <DatePicker className="w-full" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const currentArray = getCurrentIncident(currentTable);

  const currentItems = currentArray.map((item: any) => ({
    key: item.key,
    label: (
      <p className="text-xl font-semibold text-black select-none">
        {item.carrier} : {item.status} [
        {formatDate(item.reportedOn).split(",")[0]}]
      </p>
    ),
    children: (
      <div className="flex flex-col justify-center p-4">
        <span className="mb-2 text-lg font-semibold text-black">
          {" "}
          Reported On :{" "}
          <span className="font-normal">
            {" "}
            {formatDate(item.reportedOn).split(",")[0]}{" "}
          </span>
        </span>
        <span className="mb-2 text-lg font-semibold text-black">
          {" "}
          Latest Update : <span className="font-normal"> {item.update}</span>
        </span>
        <span className="mb-2 text-lg font-semibold text-black">
          {" "}
          Issue : <span className="font-normal">{item.issue}</span>
        </span>
        <span className="mb-2 text-lg font-semibold text-black">
          {" "}
          Expected Resolution Date :{" "}
          <span className="font-normal">
            {item.eta.includes("202")
              ? formatDate(item.eta).split(",")[0]
              : item.eta}
          </span>
        </span>
      </div>
    ),
    extra: genExtra(item),
  }));

  const onFinish = (values: any) => {
    const carrArr = [values.carrier];
    setSelectedCarrier(carrArr);
    let month;
    let year;
    if (
      values.month !== null &&
      values.month !== undefined &&
      values.month !== ""
    ) {
      month = (values.month.$M + 1).toString();
      if (month.length === 1) {
        month = "0" + month;
      }
      year = values.month.$y + "";
    }

    const pastArray = fetchPastIncidents(pastTable, carrArr[0], month, year);

    setPastItems(
      pastArray.map((item: any, index: any) => ({
        key: index + 1,
        label: (
          <p className="text-xl font-semibold text-black select-none">
            {item.carrier} : {item.status} [
            {formatDate(item.reportedOn).split(",")[0]}]
          </p>
        ),
        children: (
          <div className="flex flex-col justify-center p-4">
            <span className="mb-2 text-lg font-semibold text-black">
              {" "}
              Reported On :{" "}
              <span className="font-normal">
                {" "}
                {formatDate(item.reportedOn).split(",")[0]}{" "}
              </span>
            </span>
            <span className="mb-2 text-lg font-semibold text-black">
              {" "}
              Latest Update :{" "}
              <span className="font-normal"> {item.update}</span>
            </span>
            <span className="mb-2 text-lg font-semibold text-black">
              {" "}
              Issue : <span className="font-normal">{item.issue}</span>
            </span>
            <span className="mb-2 text-lg font-semibold text-black">
              {" "}
              Resolution :{" "}
              <span className="font-normal">{item.resolution}</span>
            </span>
            <span className="mb-2 text-lg font-semibold text-black">
              {" "}
              Resolution Date :{" "}
              <span className="font-normal">
                {formatDate(item.resolvedOn).split(",")[0]}
              </span>
            </span>
          </div>
        ),
      }))
    );
  };

  const oceanCarriersList = getOceanCarriers(carriers);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Carrier List",
      children: (
        <div className="bg-gray-200 rounded-md">
          <div className="py-4 px-4">
            <Table
              columns={getCarrierStatusColumns()}
              bordered={true}
              size="large"
              dataSource={oceanCarriersList}
              // loading={loading}
              pagination={false}
              scroll={{ x: "1100px", y: "675px" }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Current incidents",
      children: (
        <>
          <div className="">
            {loading ? (
              <div className="mt-8 absolute z-[999] inset-0 bg-black/10 flex justify-center items-center">
                <div className="flex items-center justify-center">
                  <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                </div>
              </div>
            ) : (
              <div className="py-4 px-4 bg-gray-200 rounded-md">
                <Collapse
                  bordered={true}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{ background: token.colorBgContainer }}
                  items={currentItems}
                />
              </div>
            )}
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "Past incidents",
      children: (
        <>
          <div className="p-3 mb-4 bg-gray-200 rounded-md">
            <Form
              name="basic"
              onFinish={onFinish}
              // form={form}
              size="middle"
              className="flex flex-col gap-1 pt-3 lg:flex-row lg:gap-2"
              //   initialValues={}
            >
              <Form.Item
                label={<p className="text-lg">Carrier</p>}
                name="carrier"
                className="min-w-[384px] lg:flex-1 mb-3 lg:mb-0"
                rules={[{ required: true, message: "Please input carrier!" }]}
              >
                <Select allowClear={true} placeholder="select carrier...">
                  {carrierList.length > 0 ? (
                    carrierList.map((item: any, index: any) => (
                      <Select.Option
                        // disabled={selectState.length === 5 && !selectState.includes(item.toLowerCase()) ? true : false}
                        key={index}
                        value={`${item.toLowerCase()}`}
                      >
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
                label={<p className="text-lg">Month-Year</p>}
                name="month"
                className="min-w-[200px]"
              >
                <DatePicker picker="month" className="w-96" />
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="px-4 py-1 text-white bg-blue-500 rounded-md border-[1px] hover:bg-white hover:border-blue-500 hover:text-blue-500"
                >
                  Search
                </button>
              </Form.Item>
            </Form>
          </div>
          <div className="">
            <div className="py-4 px-4 bg-gray-200 rounded-md">
              {pastItems.length === 0 && selectedCarrier.length !== 0 ? (
                <p className="flex justify-center text-lg font-semibold text-black">
                  {" "}
                  No incidents/outages found{" "}
                </p>
              ) : pastItems.length === 0 ? (
                <p className="flex justify-center text-lg font-semibold text-black">
                  {" "}
                  Enter carrier and month to see past incidents{" "}
                </p>
              ) : (
                // <ConfigProvider
                //   theme={{
                //     components: {
                //       Collapse: {
                //         token: {
                //           headerBg: "blue"
                //         },
                //       },
                //     },
                //   }}
                // >
                <Collapse
                  bordered={true}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{ background: token.colorBgContainer }}
                  items={pastItems}
                />
                // </ConfigProvider>
              )}
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="relative w-full min-h-full p-3">
      <div className="flex items-center justify-center pt-2 font-semibold">
        <h3 className="text-3xl">Ocean Carrier Status</h3>
      </div>
      <div className="mt-10">
        <Tabs
          tabPosition="left"
          defaultActiveKey="1"
          size="large"
          centered
          // className="flex border border-rose-700"

          items={items}
        />
      </div>
    </div>
  );
};

export default React.memo(OceanStatus);
