export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


export const loginAction = () => {
  return { type: LOGIN };
};

export const logoutAction = () => {
  return { type: LOGOUT };
};