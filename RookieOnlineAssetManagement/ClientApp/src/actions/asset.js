import api from "../api/api";
import * as assetManage from "../contains/ManageAsset";

export const get_asset_list = (asset,page) => async (dispatch) => {
  try {
    // const data = await api.Asset.getAllAsset();
    const data = await api.Asset.getAllAsset(asset,page);
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
export const disableAsset = (id) => async (dispatch) => {
  try {
    const data = await api.Asset.disableAsset(id);
    console.log(data);
    dispatch({
      type: assetManage.ASSET_DISABLE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const add_asset = (asset) => async (dispatch) => {
  try {
    console.log(asset);
    const data = await api.Asset.addAsset(asset);
    console.log(data);
    dispatch({
      type: assetManage.ADD_ASSET,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const update_asset = (asset) => async (dispatch) => {
  try {
    console.log(asset);
    const data = await api.Asset.updateAsset(asset);
    console.log(data);
    dispatch({
      type: assetManage.UPDATE_ASSET,
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

export const get_asset_state_list = () => async (dispatch) => {
  try {
    const data = await api.Asset.getStateAssetList();

    dispatch({
      type: assetManage.ASSET_STATE_LIST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const filter = (asset) => async (dispatch) => {
  try {
    const data = await api.Asset.filter(asset);

    dispatch({
      type: assetManage.FILTER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};