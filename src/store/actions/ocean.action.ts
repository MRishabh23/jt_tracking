export const CARRIER_LIST = "CARRIER_LIST";

export const carrierListAction = (obj: any) => {
  return {
    type: CARRIER_LIST,
    obj: obj,
  };
};
