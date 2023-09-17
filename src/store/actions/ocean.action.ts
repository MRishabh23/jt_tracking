export const CARRIER_LIST = "CARRIER_LIST";
export const LATENCY_LIST = "LATENCY_LIST";
export const REFERENCE_LIST = "REFERENCE_LIST";

export const carrierListAction = (obj: any) => {
  return {
    type: CARRIER_LIST,
    obj: obj
  };
};

export const latencyListAction = (obj: any) => {
  return {
    type: LATENCY_LIST,
    obj: obj
  };
};

export const referenceListAction = (obj: any) => {
  return {
    type: REFERENCE_LIST,
    obj: obj
  };
};
