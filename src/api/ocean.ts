import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  carrierListAction,
  latencyListAction,
  referenceListAction,
  historyListAction,
} from "../store/actions/ocean.action";
import type { TablePaginationConfig } from "antd/es/table";
import { notification } from "antd";
//import type { NotificationPlacement } from 'antd/es/notification/interface';

export interface OceanProp {
  type: string;
  mode: string;
  currentUser?: string | null;
  report?: string | null;
  carriers?: string[] | null;
  referenceType?: string | null;
  searchQuery?: string | null;
  timeCategory?: string | null;
  active?: string | null;
  limit?: number;
  page?: number;
  totalRecordCount?: string | null;
  subscriptionId?: string;
  history?: string;
  schId?: string | number;
  resourceId?: string;
  jsonType?: string;
  timeDuration?: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
}

async function oceanCalls(data: OceanProp) {
  const user = localStorage.getItem("Username");
  if (user !== null && user !== undefined && user !== "") {
    data.currentUser = user;
  }
  return axios({
    url: import.meta.env.VITE_REST_URL,
    timeout: 300000,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: import.meta.env.VITE_REST_USERNAME,
      password: import.meta.env.VITE_REST_PASSWORD,
    },
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export const useCarrierList = () => {
  const carrierList = useSelector((state: any) => state.ocean.carrierList);
  const dispatch = useDispatch();
  const data = { type: "CARRIER_LIST", mode: "OCEAN" };
  const carrActData = {
    carrList: [],
    error: "",
  };
  useEffect(() => {
    let ignore = false;
    const carrierCall = async () => {
      await oceanCalls(data)
        .then((res) => {
          const result = res.data;
          if (result.statusCode === "200") {
            carrActData.carrList = result.response.sort();
            dispatch(carrierListAction(carrActData));
          } else {
            throw { message: result.response };
          }
        })
        .catch((err) => {
          carrActData.error = err.message;
          dispatch(carrierListAction(carrActData));
        });
    };
    if (!ignore && data.type !== "" && carrierList.length === 0) {
      carrierCall();
    }

    return () => {
      ignore = true;
    };
  }, []);
  return { carrierList };
};

export const useLatencyList = (data: OceanProp) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const latActData = {
    error: "",
  };
  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setLoading(false);
      await oceanCalls(data)
        .then((res) => {
          if (res.status === 200 && res.data.statusCode === "200") {
            const result = res.data;
            setList(result.response);
            setLoading(true);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setLoading(true);
          latActData.error = err.message;
          dispatch(latencyListAction(latActData));
        });
    };
    if (!ignore && data.type !== "") {
      defaultCall();
    }

    return () => {
      ignore = true;
    };
  }, [data]);

  return { list, loading };
};

export const useSummaryList = (data: OceanProp) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setLoading(true);
      await oceanCalls(data)
        .then((res) => {
          if (res.status === 200 && res.data.statusCode === "200") {
            const result = res.data;
            setList(result.response);
            setLoading(false);
            setSummaryError("");
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setLoading(false);
          setSummaryError(err.message);
        });
    };
    //if (!ignore && data.type !== "" && data.carriers?.length !== 0) {
    if (!ignore && data.type !== "") {
      defaultCall();
    } else {
      setList([]);
    }

    return () => {
      ignore = true;
    };
  }, [data]);

  return { list, loading, summaryError };
};

// export const useReferenceListCount = (
//   data: OceanProp,
//   page: any,
//   myParam: any
// ) => {
//   const [count, setCount] = useState(0);
//   const dispatch = useDispatch();
//   const refActData = {
//     error: "",
//   };
//   let newData = data;
//   if (
//     data.searchQuery === undefined ||
//     data.searchQuery === null ||
//     data.searchQuery === ""
//   ) {
//     newData = { ...newData, totalRecordCount: "true" };
//   }

//   useEffect(() => {
//     let ignore = false;
//     const defaultCall = async () => {
//       await oceanCalls(newData)
//         .then((res) => {
//           if (res.status === 200 && res.data.statusCode === "200") {
//             const result = res.data;
//             setCount(result.response[0].count);
//           } else {
//             throw { message: res.message };
//           }
//         })
//         .catch((err) => {
//           refActData.error = err.message;
//           dispatch(referenceListAction(refActData));
//         });
//     };
//     if (!ignore && myParam.size !== 0) {
//       setCount(myParam.get("count"));
//     } else if (
//       !ignore &&
//       newData.type !== "" &&
//       newData.totalRecordCount === "true" &&
//       page !== undefined &&
//       page === 1
//     ) {
//       defaultCall();
//     }
//     return () => {
//       ignore = true;
//     };
//   }, [data]);

//   return { count };
// };

// export const useReferenceList = (data: OceanProp) => {
//   const [list, setList] = useState([]);
//   const [frame, setFrame] = useState("default");
//   const [loading, setLoading] = useState(false);
//   const [tableParams, setTableParams] = useState<TableParams>({
//     pagination: {
//       current: 1,
//       pageSize: 25,
//       showSizeChanger: false,
//     },
//   });
//   const dispatch = useDispatch();
//   const refActData = {
//     error: "",
//   };
//   const handleTableChange = (pagination: TablePaginationConfig) => {
//     setTableParams({
//       pagination,
//     });

//     // `dataSource` is useless since `pageSize` changed
//     if (pagination.pageSize !== tableParams.pagination?.pageSize) {
//       setList([]);
//     }
//   };

//   let newData = data;
//   if (
//     data.searchQuery === undefined ||
//     data.searchQuery === null ||
//     data.searchQuery === ""
//   ) {
//     newData = {
//       ...newData,
//       limit: tableParams.pagination?.pageSize,
//       page: tableParams.pagination?.current,
//     };
//   }
//   useEffect(() => {
//     let ignore = false;
//     const defaultCall = async () => {
//       setLoading(true);
//       await oceanCalls(newData)
//         .then((res) => {
//           if (res.status === 200 && res.data.statusCode === "200") {
//             const result = res.data;
//             setList(result.response);
//             setLoading(false);
//           } else {
//             throw { message: res.message };
//           }
//         })
//         .catch((err) => {
//           setLoading(false);
//           refActData.error = err.message;
//           dispatch(referenceListAction(refActData));
//         });
//     };

//     if (!ignore && data.type !== "") {
//       defaultCall();
//       if (
//         data.searchQuery !== undefined &&
//         data.searchQuery !== null &&
//         data.searchQuery !== ""
//       ) {
//         setFrame("search");
//       } else {
//         setFrame("default");
//       }
//     }
//     return () => {
//       ignore = true;
//     };
//   }, [data, JSON.stringify(tableParams)]);

//   return { list, loading, frame, tableParams, handleTableChange };
// };

export const useReferenceList = (data: OceanProp) => {
  const [list, setList] = useState([]);
  const [frame, setFrame] = useState("default");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const refActData = {
    error: "",
  };

  const handlePageReset = () => {
    setPage(1);
  };
  const handlePageChange = (change: string) => {
    if (change === "prev" && page > 1) {
      setPage(page - 1);
    } else if (change === "next") {
      setPage(page + 1);
    }
  };

  let newData = data;
  if (
    data.searchQuery === undefined ||
    data.searchQuery === null ||
    data.searchQuery === ""
  ) {
    newData = {
      ...newData,
      limit: 10,
      page: page,
    };
  }
  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setLoading(true);
      await oceanCalls(newData)
        .then((res) => {
          if (res.status === 200 && res.data.statusCode === "200") {
            const result = res.data;
            setList(result.response);
            setLoading(false);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setLoading(false);
          refActData.error = err.message;
          dispatch(referenceListAction(refActData));
        });
    };

    if (!ignore && data.type !== "") {
      defaultCall();
      if (
        data.searchQuery !== undefined &&
        data.searchQuery !== null &&
        data.searchQuery !== ""
      ) {
        setFrame("search");
      } else {
        setFrame("default");
      }
    }
    return () => {
      ignore = true;
    };
  }, [data, page]);

  return { list, loading, frame, page, handlePageChange, handlePageReset };
};

export const useHistoryList = (data: OceanProp) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 25,
      showSizeChanger: false,
    },
  });
  const dispatch = useDispatch();
  const hisActData = {
    error: "",
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setList([]);
    }
  };

  let newData = data;

  newData = {
    ...newData,
    limit: tableParams.pagination?.pageSize,
    page: tableParams.pagination?.current,
  };

  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setLoading(true);
      await oceanCalls(newData)
        .then((res) => {
          if (res.status === 200 && res.data.statusCode === "200") {
            const result = res.data;
            if (
              result.response.error !== undefined &&
              result.response.error !== null &&
              result.response.error !== ""
            ) {
              throw { message: result.response.error };
            }
            setList(result.response);
            setLoading(false);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          setLoading(false);
          hisActData.error = err.message;
          dispatch(historyListAction(hisActData));
        });
    };

    if (!ignore && data.type !== "" && data.subscriptionId !== "") {
      defaultCall();
    } else {
      setList([]);
    }
    return () => {
      ignore = true;
    };
  }, [data, JSON.stringify(tableParams)]);

  return { list, loading, tableParams, handleTableChange };
};

export const useHistoryListCount = (data: OceanProp, page: any) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const hisActData = {
    error: "",
  };
  let newData = data;

  if (data.subscriptionId !== null && data.subscriptionId !== "") {
    newData = { ...newData, totalRecordCount: "true" };
  }

  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      await oceanCalls(newData)
        .then((res) => {
          if (res.status === 200 && res.data.statusCode === "200") {
            const result = res.data;
            if (
              result.response.error !== undefined &&
              result.response.error !== null &&
              result.response.error !== ""
            ) {
              throw { message: result.response.error };
            }
            setCount(result.response[0].count);
          } else {
            throw { message: res.message };
          }
        })
        .catch((err) => {
          hisActData.error = err.message;
          dispatch(historyListAction(hisActData));
        });
    };
    if (
      !ignore &&
      newData.type !== "" &&
      newData.totalRecordCount === "true" &&
      page !== undefined &&
      page === 1
    ) {
      defaultCall();
    }
    return () => {
      ignore = true;
    };
  }, [data]);

  return { count };
};

export const useFetchHistoryData = (data: OceanProp) => {
  const [obj, setObj] = useState([]);
  const [objLoad, setObjLoad] = useState(false);
  type NotificationType = "success" | "info" | "warning" | "error";
  type NotificationPlacement = "top" | "topRight";
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    placement: NotificationPlacement,
    objError: any
  ) => {
    api[type]({
      message: "Something Went Wrong!!",
      description: objError,
      placement,
    });
  };

  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setObjLoad(true);
      await oceanCalls(data)
        .then((res) => {
          if (res.status === 200 && res.data.statusCode === "200") {
            const result = res.data;
            setObj(result.response);
            setObjLoad(false);
          } else {
            throw { message: res.response.data.response };
          }
        })
        .catch((err) => {
          setObjLoad(false);
          setObj([]);
          openNotificationWithIcon("error", "top", err.message);
        });
    };

    if (!ignore && data.type !== "") {
      if (
        data.subscriptionId !== undefined &&
        data.subscriptionId !== null &&
        data.subscriptionId !== ""
      ) {
        defaultCall();
      } else if (
        data.resourceId !== undefined &&
        data.resourceId !== null &&
        data.resourceId !== ""
      ) {
        defaultCall();
      } else {
        setObj([]);
      }
    }
    return () => {
      ignore = true;
    };
  }, [data]);

  return { obj, objLoad, contextHolder };
};
