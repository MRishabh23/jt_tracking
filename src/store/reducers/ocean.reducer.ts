import { listCreation } from "../../routes/ocean/ocean";
import {
  CARRIER_LIST,
  DEFAULT_LIST,
  LATENCY_LIST,
} from "../actions/ocean.action";

const initialState = {
  carrierList: [],
  hasError: false,
  errorMsg: "",
  defaultList: [],
  latencyList: [],
};

const oceanReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CARRIER_LIST:
      const cList = action.carrierList;
      const cError = action.hasError;
      const cErrorMsg = action.errorMsg;
      if (cList !== undefined && cList.length > 0) {
        return {
          ...state,
          carrierList: cList,
          hasError: cError,
          errorMsg: cErrorMsg,
        };
      }
      return state;
    case DEFAULT_LIST:
      const dList = action.defaultList;
      const dError = action.hasError;
      const dErrorMsg = action.errorMsg;
      if (dList !== undefined && dList.length > 0) {
        const getL = listCreation(dList);
        return {
          ...state,
          defaultList: getL,
          hasError: dError,
          errorMsg: dErrorMsg,
        };
      }
      return state;
    case LATENCY_LIST:
      const lList = action.latencyList;
      const lError = action.hasError;
      const lErrorMsg = action.errorMsg;
      if (lList !== undefined && lList.length > 0) {
        const getL = listCreation(lList);
        return {
          ...state,
          latencyList: getL,
          hasError: lError,
          errorMsg: lErrorMsg,
        };
      }
      return state;

    default:
      return state;
  }
};

export default oceanReducer;
