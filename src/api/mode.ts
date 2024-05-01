import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  oceanCarrierListAction,
  airCarrierListAction,
} from "../store/actions/mode.action";
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
    timeout: 300000, //old -> 120000, new -> 300000
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

export const useOceanCarrierList = () => {
  const carrierList = useSelector((state: any) => state.ocean.oceanCarrierList);
  const dispatch = useDispatch();
  const data = { type: "CARRIER_LIST", mode: "OCEAN" };
  const carrActData = {
    carrList: [],
  };
  const [oceanListError, setOceanListError] = useState("");
  useEffect(() => {
    let ignore = false;
    const carrierCall = async () => {
      await oceanCalls(data)
        .then((res) => {
          const result = res.data;
          if (result.statusCode === "200" && res.data.response.success) {
            carrActData.carrList = result.response.data.sort();
            dispatch(oceanCarrierListAction(carrActData));
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setOceanListError(err.message);
          dispatch(oceanCarrierListAction(carrActData));
        });
    };
    if (!ignore && data.type !== "" && carrierList.length === 0) {
      carrierCall();
    }

    return () => {
      ignore = true;
    };
  }, []);
  return { carrierList, oceanListError };
};

export const useAirCarrierList = () => {
  const carrierList = useSelector((state: any) => state.ocean.airCarrierList);
  const dispatch = useDispatch();
  const data = { type: "CARRIER_LIST", mode: "AIR" };
  const carrActData = {
    carrList: [],
  };
  const [airListError, setAirListError] = useState("");
  useEffect(() => {
    let ignore = false;
    const carrierCall = async () => {
      await oceanCalls(data)
        .then((res) => {
          const result = res.data;
          if (result.statusCode === "200" && res.data.response.success) {
            carrActData.carrList = result.response.data.sort();
            dispatch(airCarrierListAction(carrActData));
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setAirListError(err.message);
          dispatch(airCarrierListAction(carrActData));
        });
    };
    if (!ignore && data.type !== "" && carrierList.length === 0) {
      carrierCall();
    }

    return () => {
      ignore = true;
    };
  }, []);
  return { carrierList, airListError };
};

export const useLatencyList = (params: any, mode: string) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latencyError, setLatencyError] = useState("");
  const data = {
    type: "LATENCY",
    mode: mode,
    report: params.get("queue").toUpperCase(),
    carriers: params.getAll("carriers") || [],
    referenceType: params.get("referenceType") || "",
  };
  useEffect(() => {
    let ignore = false;
    setLatencyError("");
    const defaultCall = async () => {
      setLoading(false);
      await oceanCalls(data)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            setList(result.response.data);
            setLoading(true);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setLoading(true);
          setLatencyError(err.message);
        });
    };
    if (!ignore && data.type !== "" && data.carriers.length > 0) {
      defaultCall();
    }

    return () => {
      ignore = true;
    };
  }, [params]);

  return { list, loading, latencyError };
};

export const useSummaryList = (params: any, mode: string) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const data = {
    type: "CRAWL_SUMMARY",
    mode: mode,
    report: params.get("queue").toUpperCase(),
    carriers: params.getAll("carriers") || [],
    timeDuration: "",
    startTime: params.get("start") || "",
    endTime: params.get("end") || "",
  };
  useEffect(() => {
    let ignore = false;
    setSummaryError("");
    const defaultCall = async () => {
      setLoading(true);
      await oceanCalls(data)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            setList(result.response.data);
            setLoading(false);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setLoading(false);
          setSummaryError(err.message);
        });
    };
    if (!ignore && data.type !== "") {
      defaultCall();
    } else {
      setList([]);
    }

    return () => {
      ignore = true;
    };
  }, [params]);

  return { list, loading, summaryError };
};

export const useLatencyChart = (params: any) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latencyChartError, setLatencyChartError] = useState("");
  const data = {
    type: "INDUCED_LATENCY",
    mode: "OCEAN",
    carriers: params.getAll("carriers") || [],
    year: params.get("year") || "2024",
    months: params.getAll("months") || [],
  };
  useEffect(() => {
    let ignore = false;
    setLatencyChartError("");
    const defaultCall = async () => {
      setLoading(true);
      await oceanCalls(data)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            setList(result.response.data);
            setLoading(false);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setLoading(false);
          setLatencyChartError(err.message);
        });
    };
    if (
      !ignore &&
      data.type !== "" &&
      data.carriers.length !== 0 &&
      data.months.length !== 0
    ) {
      defaultCall();
    } else {
      setList([]);
    }

    return () => {
      ignore = true;
    };
  }, [params]);

  return { list, loading, latencyChartError };
};

export const useReferenceListCount = (param: any, page: any, mode: string) => {
  const [count, setCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(false);
  const [referenceCountError, setReferenceCountError] = useState("");
  const data = {
    report: (param.get("queue") || "").toUpperCase(),
    carriers: param.getAll("carriers") || "",
    referenceType: param.get("referenceType") || "",
    bucket: "",
    active: param.get("active") || "yes",
    searchQuery: param.get("searchQuery") || "",
    mode: mode,
    type: "REFERENCE_LIST",
    referenceQuery: param.get("referenceQuery") || "",
  };
  let newData: any = data;
  if (
    (data.searchQuery === undefined ||
      data.searchQuery === null ||
      data.searchQuery === "") &&
    (data.referenceQuery === undefined ||
      data.referenceQuery === null ||
      data.referenceQuery === "")
  ) {
    newData = { ...newData, totalRecordCount: "true" };
  } else {
    newData = { ...newData, totalRecordCount: "false" };
  }

  useEffect(() => {
    let ignore = false;

    const defaultCall = async () => {
      setLoadingCount(true);
      await oceanCalls(newData)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            if (
              result.response.error !== undefined &&
              result.response.error !== null &&
              result.response.error !== ""
            ) {
              throw { message: result.response.error };
            }
            setCount(result.response.data[0].count);
            setLoadingCount(false);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setReferenceCountError(err.message);
        });
    };
    const count = param.get("count") || "";
    if (!ignore && count !== "") {
      setReferenceCountError("");
      setCount(param.get("count"));
    } else if (
      !ignore &&
      newData.type !== "" &&
      newData.totalRecordCount === "true" &&
      page !== undefined &&
      page === 1
    ) {
      setReferenceCountError("");
      defaultCall();
    } else {
      setReferenceCountError("");
      setLoadingCount(false);
    }

    return () => {
      ignore = true;
    };
  }, [param]);

  return { count, loadingCount, referenceCountError };
};

export const useReferenceList = (param: any, mode: string) => {
  const [list, setList] = useState([]);
  const [frame, setFrame] = useState("default");
  const [loading, setLoading] = useState(false);
  const [referenceError, setReferenceError] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setList([]);
    }
  };
  const searchQ = param.get("searchQuery") || "";
  const referenceQ = param.get("referenceQuery") || "";
  let refType = param.get("referenceType") || "";
  refType = refType.includes("BOOK")
    ? "BOOKING"
    : refType.includes("BILL")
    ? "BILLOFLADING"
    : refType.includes("CONT")
    ? "CONTAINER"
    : refType.includes("AWB")
    ? "AWB"
    : "";

  const data =
    searchQ === "" && referenceQ === ""
      ? {
          report: (param.get("queue") || "").toUpperCase(),
          carriers: param.getAll("carriers") || [],
          referenceType: refType || "",
          bucket: param.get("bucket") || "",
          searchQuery: param.get("searchQuery") || "",
          active: param.get("active") || "yes",
          mode: mode,
          type: "REFERENCE_LIST",
        }
      : referenceQ === ""
      ? {
          mode: mode,
          type: "REFERENCE_LIST",
          searchQuery: param.get("searchQuery") || "",
        }
      : {
          mode: mode,
          type: "REFERENCE_LIST",
          referenceQuery: param.get("referenceQuery") || "",
        };

  let newData: any = data;
  if (searchQ === "" && referenceQ === "") {
    newData = {
      ...newData,
      limit: tableParams.pagination?.pageSize,
      page: tableParams.pagination?.current,
    };
  }
  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setReferenceError("");
      setLoading(true);
      await oceanCalls(newData)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            if (
              result.response.error !== undefined &&
              result.response.error !== null &&
              result.response.error !== ""
            ) {
              throw { message: result.response.error };
            }
            setList(result.response.data);
            setLoading(false);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setLoading(false);
          setReferenceError(err.message);
        });
    };

    if (!ignore && data.type !== "") {
      defaultCall();
      if (searchQ !== "" || referenceQ !== "") {
        setFrame("search");
      } else {
        setFrame("default");
      }
    }
    return () => {
      ignore = true;
    };
  }, [param, JSON.stringify(tableParams)]);

  return {
    list,
    loading,
    frame,
    tableParams,
    handleTableChange,
    referenceError,
  };
};

export const useHistoryList = (params: any, mode: string) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setList([]);
    }
  };

  let newData: OceanProp = {
    mode: mode,
    type: "REFERENCE_HISTORY",
    subscriptionId: params.get("subscriptionId") || "",
    history: params.get("history") || "DIFF_HISTORY",
  };

  newData = {
    ...newData,
    limit: tableParams.pagination?.pageSize,
    page: tableParams.pagination?.current,
  };

  useEffect(() => {
    let ignore = false;
    const defaultCall = async () => {
      setHistoryError("");
      setLoading(true);
      await oceanCalls(newData)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            if (
              result.response.error !== undefined &&
              result.response.error !== null &&
              result.response.error !== ""
            ) {
              throw { message: result.response.error };
            }
            setList(result.response.data);

            setLoading(false);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setHistoryError(err.message);
          setLoading(false);
        });
    };

    if (
      !ignore &&
      params.get("type") !== "" &&
      (params.get("subscriptionId") || "") !== ""
    ) {
      defaultCall();
    } else {
      setList([]);
    }
    return () => {
      ignore = true;
    };
  }, [params, JSON.stringify(tableParams)]);

  return { list, loading, tableParams, handleTableChange, historyError };
};

export const useHistoryListCount = (params: any, page: any, mode: string) => {
  const [count, setCount] = useState(0);
  const [historyCountError, setHistoryCountError] = useState("");
  let newData: OceanProp = {
    mode: mode,
    type: "REFERENCE_HISTORY",
    subscriptionId: params.get("subscriptionId") || "",
    history: params.get("history"),
  };
  if (newData.subscriptionId !== null && newData.subscriptionId !== "") {
    newData = { ...newData, totalRecordCount: "true" };
  }

  useEffect(() => {
    let ignore = false;
    setHistoryCountError("");
    const defaultCall = async () => {
      await oceanCalls(newData)
        .then((res) => {
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            if (
              result.response.error !== undefined &&
              result.response.error !== null &&
              result.response.error !== ""
            ) {
              throw { message: result.response.error };
            }
            setHistoryCountError("");
            setCount(result.response.data[0].count);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
          }
        })
        .catch((err) => {
          setHistoryCountError(err.message);
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
  }, [params]);

  return { count, historyCountError };
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
          if (
            res.status === 200 &&
            res.data.statusCode === "200" &&
            res.data.response.success
          ) {
            const result = res.data;
            setObj(result.response.data);
            setObjLoad(false);
          } else {
            throw { message: res.data !== undefined ? res.data.response.data : res.message };
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
