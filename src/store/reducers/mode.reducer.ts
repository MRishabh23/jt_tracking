import { OCEAN_CARRIER_LIST, AIR_CARRIER_LIST } from "../actions/mode.action";

const initialState = {
  oceanCarrierList: [],
  airCarrierList: []
};

const modeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OCEAN_CARRIER_LIST:
      const oceanList = action.obj.carrList;
      if (oceanList !== undefined && oceanList.length > 0) {
        return {
          ...state,
          oceanCarrierList: oceanList
        };
      }
      return state;
    case AIR_CARRIER_LIST:
      const airList = action.obj.carrList;
      if (airList !== undefined && airList.length > 0) {
        return {
          ...state,
          airCarrierList: airList
        };
      }
      return state;
    default:
      return state;
  }
};

export default modeReducer;
