import {
  CARRIER_LIST,
  LATENCY_LIST,
  REFERENCE_LIST,
} from "../actions/ocean.action";

const initialState = {
  carrierList: [],
  cError: "",
  lError: "",
  rError: "",
};

const oceanReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CARRIER_LIST:
      const cList = action.obj.carrList;
      const cError = action.obj.error;
      if (cError !== undefined && cError !== "") {
        return {
          ...state,
          cError: cError,
          carrierList: [],
        };
      } else if (cList !== undefined && cList.length > 0) {
        return {
          ...state,
          carrierList: cList,
          cError: "",
        };
      }
      return state;
    case LATENCY_LIST:
      const lError = action.obj.error;
      if (lError !== undefined && lError !== "") {
        return {
          ...state,
          lError: lError,
        };
      } else {
        return {
          ...state,
          lError: "",
        };
      }
    case REFERENCE_LIST:
      const rError = action.obj.error;
      if (rError !== undefined && rError !== "") {
        return {
          ...state,
          rError: rError,
        };
      } else {
        return {
          ...state,
          rError: "",
        };
      }
    default:
      return state;
  }
};

export default oceanReducer;
