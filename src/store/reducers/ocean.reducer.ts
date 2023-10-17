import {
  CARRIER_LIST,
} from "../actions/ocean.action";

const initialState = {
  carrierList: [],
  cError: "",
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
    default:
      return state;
  }
};

export default oceanReducer;
