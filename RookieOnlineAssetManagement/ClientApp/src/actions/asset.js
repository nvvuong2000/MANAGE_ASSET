import api from "../api/api";
import * as assetManage from "../contains/ManageAsset";

export const get_asset_list = () => async (dispatch) => {
  try {
    const data = await api.Asset.getAllAsset();
    console.log(data);
    dispatch({
      type: assetManage.ASSET_LIST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_asset_byId = (id) => async (dispatch) => {
  try {
    const data = await api.Asset.getAssetById(id);
    console.log(data);
    dispatch({
      type: assetManage.ASSET_SELECTED,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_asset_history = (id) => async (dispatch) => {
  try {
    const data = await api.Asset.getAssetHistory(id);
    console.log(data);
    dispatch({
      type: assetManage.ASSET_HISTORY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};