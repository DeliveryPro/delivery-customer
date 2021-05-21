import { handleActions } from "redux-actions";

import { loginSuccess } from "../actions/auth-action";

const defaultState = {
  isAuth: false
};

const authReducer = handleActions(
  {
    [loginSuccess]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  defaultState
);

export default authReducer;
