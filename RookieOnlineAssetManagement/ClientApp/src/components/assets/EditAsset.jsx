import React, { useState, useEffect, Fragment } from "react";
import * as assetManage from "../../actions/asset"
import { useHistory, useParams } from "react-router-dom";
import {
  Input, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import "../../css/user_css/create.css";
import "../../css/asset_css/create.css";
import * as categoryManage from "../../actions/category";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
export default function CreateAsset(props) {
  props.setPageName("Manage Asset > Edit Asset");
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  // useEffect(() => {
  //   dispatch(assetManage.get_asset_byId(id));
  // }, [id]);
  const getStateAssetList = useSelector((state) => state.asset.assetStateList);
  useEffect(() => {
    dispatch(assetManage.get_asset_state_list());
    dispatch(categoryManage.get_category_list());
    dispatch(assetManage.get_asset_byId(id));
  }, []);
  useEffect(() => {
    dispatch(assetManage.get_asset_byId(id));
  }, [id]);

  const AssetDetails = useSelector((state) => state.asset.assetSelected)

  const getCategoryList = useSelector((state) => state.category.categoryList);



  const [categoryList, setCategoryList] = useState([]);


  const [modal, setModal] = useState(false);

  const options = [
    { value: AssetDetails.categoryId, label: AssetDetails.categoryName },

  ]

  const [checkEr, setCheckEr] = useState(false);
  const toggleEr = () => setCheckEr(!checkEr);

  const [InstalledDate, setInstalledDate] = useState(new Date());
  const [joinedDate, setJoinedDate] = useState(new Date());

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [assetInfo, setAsset] = useState({

    Id: "",
    Assetname: "",
    Specification: "",
    StateAsset: 0,
    InstalledDate: "",
    CategoryId: "",
    Location: ""
  });
  useEffect(() => {

    setAsset({
      Id: AssetDetails.assetCode,
      Assetname: AssetDetails.assetName,
      Specification: AssetDetails.specification,
      StateAsset: AssetDetails.stateAsset,
      InstalledDate: AssetDetails.installedDate,
      CategoryId: AssetDetails.categoryId,
      Location: ""
    });

  }, [id]);


  const [createCategory, setCreateCategory] = useState({
    CategoryName: "",
    Prefix: "",
  });

  const [btnDisable, setBtnDisable] = useState(true);

  const onChangeCreateAsset = (e) => {
    const { name, value } = e.target;
    setAsset({ ...assetInfo, [name]: value });
  };

  const onChangeCreateCategory = (e) => {
    const { name, value } = e.target;
    setCreateCategory({ ...createCategory, [name]: value });
  };

  const CreateCategory = () => {
    dispatch(categoryManage.add_category(createCategory));
    setCheckEr(!!!checkEr)
  };
  const handleClick = () => {
    setModal(false);
    dispatch(categoryManage.edit_mess());
  }

  // useEffect(()=>{
  //   if (getError) {

  //   }
  //     toggleModal();
  // },[checkEr])

  const onSelectType = (e) => {
    setAsset({ ...assetInfo, CategoryId: e.value });
  };

  const [err, setErr] = useState({ Check18YearsOld: "" });

  const onCreate = () => {

    dispatch(assetManage.update_asset(assetInfo));

  }

  return (
    <div className="col-3">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <b>Create New Asset</b>
        </div>

        <div id="secondRowInRight">

          <div className="row  form-group mb-3">
            <div className="col-4">

              <label>Name</label>
            </div>
            <div className="col-8">
              <Input
                value={assetInfo.Assetname}
                type="text"
                onChange={onChangeCreateAsset}
                name="Assetname"
              ></Input>
            </div>
          </div>

          <div className="row  form-group mb-3">
            <div className="col-4">
              <label>Category</label>
            </div>

            <div className="col-8">
              <div className="form-group">
                <Fragment>
                  <select class="form-control" disabled>
                    {getCategoryList && getCategoryList.map((item, index) => {

                      return (<option key={index} value={assetInfo.StateAsset} name="StateAsset" selected={item.categoryId === assetInfo.CategoryId} onChange={onChangeCreateAsset} >{item.categoryName}</option>)
                    })}
                  </select>
                </Fragment>
              </div>



            </div>


            <div>
            </div>
          </div>

          <div className="row  form-group mb-3">
            <div className="col-4">
              <label>Specification</label>
            </div>
            <div className="col-8">
              <Input type="textarea" value={assetInfo.Specification} name="Specification" id="exampleText" onChange={onChangeCreateAsset} />
            </div>
          </div>

          <div className="row  form-group mb-3">
            <div className="col-4">
              <label>Installed Date</label>
            </div>
            <div className="col-8">
              <DateTimePicker
                name="JoinedDate"
                onChange={setInstalledDate}
                value={InstalledDate}
                format="dd/MM/y"
                clearIcon
                maxDate={new Date()}
                className="dateTimeassetInfo"
              ></DateTimePicker>
            </div>
          </div>

          <div className="row  form-group mb-3">
            <div className="col-4">
              <label>State</label>
            </div>
            <div className="col-8">
              <div className="radioBtnassetInfo">
                {
                  getStateAssetList && getStateAssetList.map((item) => {
                    if (item.name === "Assigned") {
                    }
                    else {
                      return (
                        <div>
                          <label>
                            {/* checked={item.key == assetInfo.CategoryId}  */}
                            <input type="radio" value={item.key} name="StateAsset" onChange={onChangeCreateAsset} /> {item.name}
                          </label>
                        </div>
                      )
                    }
                  })
                }



              </div>
            </div>
          </div>

          <div className="row">
        

            <div className="col-6"></div>
            <div className="col-3">
              <Button onClick={onCreate} color="danger">
                Save
                </Button>
            </div>
            <div className="col-3">
              <Button  onClick={() => history.push("/asset")}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
