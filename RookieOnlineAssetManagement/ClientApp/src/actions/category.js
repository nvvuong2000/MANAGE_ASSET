import api from "../api/api";
import * as categoryManage from "../contains/ManageCategory";

export const get_category_list = () => async (dispatch) => {
  try {
    const data = await api.Category.getAllCategory();
    dispatch({
      type: categoryManage.CATEGORY_LIST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const add_category = (category) => async (dispatch) => {
  try {
    var r = await api.Category.addCategory(category);
    const data = await api.Category.getAllCategory();
    const result = { "data": data, "error": r.message }
    dispatch({
      type: categoryManage.ADD_CATEGORY,
      payload: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const edit_mess= () => async (dispatch) => {
  try {

    dispatch({
      type: categoryManage.EDIT_MESSAGE,
      payload: "",
    });
  } catch (error) {
    console.log(error);
  }
};