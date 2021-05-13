import * as userManage from "../contains/ManageUser";

const initialState = {
  userList: [],
  userSelected: {},
  userLogin: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case userManage.USER_LIST: {
      state.userList = payload;
      return { ...state };
    }
    case userManage.USER_SELECTED: {
      state.userSelected = payload;
      return { ...state };
    }
    case userManage.ADD_USER: {
      console.log(payload);
      state.userList = state.userList.push(payload);
      return { ...state };
    }
    case userManage.UPDATE_USER: {
      state.userList = payload;
      return { ...state };
    }
    case userManage.DISABLE_USER: {
      state.userList = state.userList.filter((x) => x.id != payload);
      return { ...state };
    }
    case userManage.GET_USER_LOGIN: {
      state.userLogin = payload;
      return { ...state };
    }
    case userManage.SORT_USER:{
      state.userList=payload;
      return{...state}
    }
    default:
      return state;
  }
};
