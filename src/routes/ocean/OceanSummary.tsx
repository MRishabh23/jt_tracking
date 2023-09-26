import React, { useState} from "react";
import { useCheckAuth } from "../../api/auth";
import { Form, Select, Table } from "antd";
import { useCarrierList } from "../../api/ocean";
import { FaSpinner } from "react-icons/fa";
import { getSummaryColumns } from "../../components/report";

const OceanSummary: React.FC = () => {
    useCheckAuth();
    const [selectState, setSelectState] = useState<String[]>([]);
    const [error, setError] = useState("");
    const { carrierList } = useCarrierList();
    const getSumCol = getSummaryColumns();

    const handleChange = (value: any) => {
        setError(""); // for getting rid of warning
    let newState = [];
    for (let x in value) {
      newState.push(value[x]);
    }
    setSelectState(newState);
  };

    // useEffect(() => {
    //     let ignore = false;
    //     if (!ignore) {
    //       if (gError !== "") {
    //         setError(gError);
    //       } else {
    //         setError("");
    //       }
    //     }
    //     return () => {
    //       ignore = true;
    //     };
    //   }, [gError]);

    return (
        <div className="relative w-full min-h-full p-3">
        <div className="flex items-center justify-center pt-2 font-semibold">
          <h3 className="text-3xl">Crawl Summary (Coming soon....)</h3>
        </div>
        <div className="p-3 mt-8 bg-gray-200 rounded-md lg:mt-12">
        <Form
            name="basic"
            // onFinish={onFinish}
            size="middle"
            className="flex flex-col gap-1 pt-3 lg:flex-row lg:gap-2"
            initialValues={{ queue: "NORMAL" }}
          >
            <Form.Item
              label={<p className="text-lg">Carrier</p>}
              name="carrier"
              className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
              rules={[{ required: true, message: "Please input carrier!" }]}
            >
              <Select
                allowClear={true}
                mode="multiple"
                onChange={(value) => {
                  handleChange(value)
                }}
                placeholder="select carrier..."
              >
                {carrierList.length > 0 ? (
                  carrierList.map((item: any, index: any) => (
                    <Select.Option
                      disabled={selectState.length === 5 && !selectState.includes(item.toLowerCase()) ? true : false}
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
            {/* <Form.Item
              label={<p className="text-lg">Average</p>}
              name="average"
              className="min-w-[200px] lg:flex-1 mb-3 lg:mb-0"
            >
              <Select placeholder="select time average..." allowClear={true}>
                <Select.Option value="">7 days</Select.Option>
                <Select.Option value="">1 month</Select.Option>
              </Select>
            </Form.Item> */}
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
              {/* {list.length > 0 ? ( */}
                <Table
                  columns={getSumCol}
                //   dataSource={data2}
                //   pagination={{
                //     current: tableParams.pagination?.current,
                //     pageSize: tableParams.pagination?.pageSize,
                //     showSizeChanger: false,
                //     total: count,
                //   }}
                //   loading={loading}
                //   onChange={handleTableChange}
                  scroll={{ x: "1100px", y: "675px" }}
                />
              {/* ) : ( */}
                {/* <>
                  {list.length === 0 && loading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="text-3xl text-blue-500 animate-spin" />
                    </div>
                  ) : (
                    <p className="flex justify-center text-lg font-semibold text-black">
                      Enter the Subscription Id to see history!
                    </p>
                  )}
                </>
              )} */}
            </div>
          </div>
        )}
        </div>
    )
}

export default React.memo(OceanSummary);


