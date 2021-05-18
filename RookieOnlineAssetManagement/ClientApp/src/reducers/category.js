import * as categoryManage from "../contains/ManageCategory";

const initialState = {
  categoryList: [],
  isErrorMessage: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case categoryManage.CATEGORY_LIST: {
      state.categoryList = payload;
      return { ...state };
    }
    case categoryManage.ADD_CATEGORY: {
      state.categoryList = payload.data;
      state.isErrorMessage = payload.error;
      return { ...state };
    }
    case categoryManage.EDIT_MESSAGE: {
      console.log(payload)
      state.isErrorMessage = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
