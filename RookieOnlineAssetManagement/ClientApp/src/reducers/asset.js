import * as assetManage from "../contains/ManageAsset";

const initialState = {
  assetList: [],
  assetSelected: {},
  userLogin: {},
  assetHistory: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case assetManage.ASSET_LIST: {
      state.assetList = payload;
      return { ...state };
    }
    case assetManage.ASSET_SELECTED: {
      state.assetSelected = payload;
      return { ...state };
    }
    case assetManage.ASSET_HISTORY: {
      state.assetHistory = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
