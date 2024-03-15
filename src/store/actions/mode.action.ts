export const OCEAN_CARRIER_LIST = "OCEAN_CARRIER_LIST";
export const AIR_CARRIER_LIST = "AIR_CARRIER_LIST";

export const oceanCarrierListAction = (obj: any) => {
  return {
    type: OCEAN_CARRIER_LIST,
    obj: obj,
  };
};

export const airCarrierListAction = (obj: any) => {
  return {
    type: AIR_CARRIER_LIST,
    obj: obj,
  };
};
