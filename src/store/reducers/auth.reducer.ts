import { LOGIN, LOGOUT } from "../actions/auth.action";

const initialState = {
  hasAuth: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      const user = localStorage.getItem("Username");
      if (user !== null && user !== undefined && user !== "") {
        return {
          ...state,
          hasAuth: true,
        };
      } 
      return {
        ...state,
        hasAuth: false,
      }
    case LOGOUT:
      return {
        ...state,
        hasAuth: false,
      };
    default:
      return state;
  }
};

export default authReducer;
