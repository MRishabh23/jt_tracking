import { OCEAN_CARRIER_LIST, AIR_CARRIER_LIST } from "../actions/mode.action";

const initialState = {
  oceanCarrierList: [],
  oceanError: "",
  airCarrierList: [],
  airError: "",
};

const modeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OCEAN_CARRIER_LIST:
      const oceanList = action.obj.carrList;
      const oceanError = action.obj.error;
      if (oceanError !== undefined && oceanError !== "") {
        return {
          ...state,
          oceanError: oceanError,
          oceanCarrierList: [],
        };
      } else if (oceanList !== undefined && oceanList.length > 0) {
        return {
          ...state,
          oceanCarrierList: oceanList,
          oceanError: "",
        };
      }
      return state;
    case AIR_CARRIER_LIST:
      const airList = action.obj.carrList;
      const airError = action.obj.error;
      if (airError !== undefined && airError !== "") {
        return {
          ...state,
          airError: airError,
          airCarrierList: [],
        };
      } else if (airList !== undefined && airList.length > 0) {
        return {
          ...state,
          airCarrierList: airList,
          airError: "",
        };
      }
      return state;
    default:
      return state;
  }
};

export default modeReducer;
