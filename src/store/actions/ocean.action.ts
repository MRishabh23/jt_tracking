export const CARRIER_LIST = "CARRIER_LIST";
export const DEFAULT_LIST = "DEFAULT_LIST";
export const LATENCY_LIST = "LATENCY_LIST";

export const carrierListAction = (data: any) => {
  return {
    type: CARRIER_LIST,
    carrierList: data.carrierList,
    hasError: data.hasError,
    errorMsg: data.errorMsg,
  };
};

export const defaultListAction = (data: any) => {
  return {
    type: DEFAULT_LIST,
    defaultList: data.defaultList,
    hasError: data.hasError,
    errorMsg: data.errorMsg,
  };
};

export const latencyListAction = (data: any) => {
  return {
    type: LATENCY_LIST,
    latencyList: data.latencyList,
    hasError: data.hasError,
    errorMsg: data.errorMsg,
  };
};
