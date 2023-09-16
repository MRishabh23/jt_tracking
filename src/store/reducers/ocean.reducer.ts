import {
  CARRIER_LIST,
  LATENCY_LIST,
} from "../actions/ocean.action";

const initialState = {
  carrierList: [],
  error: ""
};

const oceanReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CARRIER_LIST:
      const cList = action.obj.carrList;
      const cError = action.obj.error;
      if(cError !== undefined && cError !== ""){
        return {
          ...state,
          error: cError,
          carrierList: []
        };
      }else if (cList !== undefined && cList.length > 0) {
        return {
          ...state,
          carrierList: cList,
          error: ""
        };
      }
      return state;
    case LATENCY_LIST:
      const lError = action.obj.error;
      if(lError !== undefined && lError !== ""){
        return {
          ...state,
          error: lError
        };
      }else{
        return {
          ...state,
          error: ""
        };
      }
      return state;

    default:
      return state;
  }
};

export default oceanReducer;
