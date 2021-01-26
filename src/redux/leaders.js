import * as ActionTypes from "./ActionTypes";
export const Leaders = (
  state = { leaders: [], errMess: null, isLoading: true },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        leaders: action.payload,
        errMess: null,
        isLoading: false,
      };

    case ActionTypes.LEADERS_LOADING:
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case ActionTypes.LEADERS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
