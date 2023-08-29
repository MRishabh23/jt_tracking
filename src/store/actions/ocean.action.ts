import { oceanCalls } from "../../api/oceanApi";

export const CARRIER_LIST = "CARRIER_LIST";
export const DEFAULT_LIST = "DEFAULT_LIST";
export const LATENCY_LIST = "LATENCY_LIST";

export const carrierListAction = async (data: object) => {
  let carrierList: any = [];
  let hasError = false;
  let errorMsg = "";
  await oceanCalls(data)
    .then((res) => {
      carrierList = res.sort();
    })
    .catch((err) => {
      hasError = true;
      errorMsg = err;
    });

  return {
    type: CARRIER_LIST,
    carrierList: carrierList,
    hasError: hasError,
    errorMsg: errorMsg,
  };
};

export const defaultListAction = async (data: object) => {
  let defaultList: any = [];
  let hasError = false;
  let errorMsg = "";
  await oceanCalls(data)
    .then((res) => {
      defaultList = res;
    })
    .catch((err) => {
      hasError = true;
      errorMsg = err;
    });

  return {
    type: DEFAULT_LIST,
    defaultList: defaultList,
    hasError: hasError,
    errorMsg: errorMsg,
  };
};

export const latencyListAction = async (data: object) => {
  let latencyList: any = [];
  let hasError = false;
  let errorMsg = "";
  await oceanCalls(data)
    .then((res) => {
      latencyList = res;
    })
    .catch((err) => {
      hasError = true;
      errorMsg = err;
    });

  return {
    type: LATENCY_LIST,
    latencyList: latencyList,
    hasError: hasError,
    errorMsg: errorMsg,
  };
};
