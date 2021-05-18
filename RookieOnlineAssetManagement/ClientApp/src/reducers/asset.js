import * as assetManage from "../contains/ManageAsset";

const initialState = {
  assetList: [],
  assetSelected: {},
  userLogin: {},
  assetHistory: [],
  assetStateList:[],
  addasset:{},
  messgaeDisableAsset:"",
  page:[],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case assetManage.ASSET_LIST: {
      console.log(payload);
      state.assetList = payload.data;
      let headers = JSON.parse(payload.headers.pagination);
      let list = [];
      for (let i = 1; i <= headers.TotalPages; i++) {
        list.push(i);
      }
      state.page = list;
      return { ...state };
    }
    case assetManage.ADD_ASSET: {
      state.addasset = payload;
      return { ...state };
    }
    case assetManage.ASSET_DISABLE: {
      if(payload===true){
       
      }
      else{
        state.messgaeDisableAsset="can not delete";
      }
      // state.messgaeDisableAsset = payload;
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
    case assetManage.ASSET_STATE_LIST: {
      state.assetStateList = payload;
      return { ...state };
    }
    case assetManage.UPDATE_ASSET: {
      // state.assetStateList = payload;
      return { ...state };
    }
    case assetManage.FILTER: {
      console.log(payload);
      state.assetList = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
