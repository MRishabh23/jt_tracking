import { LOGIN, LOGOUT } from "../actions/auth.action";

const initialState = {
  hasAuth: false,
  user: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      const user = localStorage.getItem("Username");
      if (user !== null && user !== undefined && user !== "") {
        return {
          ...state,
          hasAuth: true,
          user: user
        };
      } 
      return {
        ...state,
        hasAuth: false,
        user: ""
      }
    case LOGOUT:
      return {
        ...state,
        hasAuth: false,
        user: ""
      };
    default:
      return state;
  }
};

export default authReducer;
