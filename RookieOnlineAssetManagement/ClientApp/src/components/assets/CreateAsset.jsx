import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import * as assetManage from "../../actions/asset"
import * as userManage from "../../actions/user";
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
import {
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateAsset() {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(categoryManage.get_category_list());
  }, []);

  const getCategoryList = useSelector((state) => state.category.categoryList);
  var getError = useSelector((state) => state.category.isErrorMessage);

  var displayErr = getError;

  const [categoryList, setCategoryList] = useState([]);

  const [popupAddNewCategory, setPopupAddNewCategory] = useState(false);

  const popupCategory = () => {
    setPopupAddNewCategory(!popupAddNewCategory);
  }

  useEffect(() => {
    setCategoryList(getCategoryList);
  }, [getCategoryList]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (modal == false) {
      displayErr = ""
    };
  };

  const [checkEr, setCheckEr] = useState(false);
  const toggleEr = () => setCheckEr(!checkEr);

  const [InstalledDate, setInstalledDate] = useState(new Date());
  const [joinedDate, setJoinedDate] = useState(new Date());

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const [assetInfo, setassetInfo] = useState({
    Id: "",
    Assetname: "",
    Specification: "",
    StateAsset: 0,
    InstalledDate: "",
    CategoryId: 0,
    Location: ""
  });

  const [createCategory, setCreateCategory] = useState({
    CategoryName: "",
    Prefix: "",
  });

  const [btnDisable, setBtnDisable] = useState(true);

  const onChangeCreateAsset = (e) => {
    const { name, value } = e.target;
    setassetInfo({ ...assetInfo, [name]: value });
  };

  const onChangeCreateCategory = (e) => {
    const { name, value } = e.target;
    setCreateCategory({ ...createCategory, [name]: value });
  };

  const CreateCategory = () => {
    dispatch(categoryManage.add_category(createCategory));
    setCheckEr(!!!checkEr)
  };

  useEffect(() => {
    if (displayErr != "" && displayErr != "Success") {
      toggleModal();
    }
  }, [displayErr])

  const handleClick = () => {
    setModal(false);
    dispatch(categoryManage.edit_mess());
  }

  const onSelectType = (e) => {
    setassetInfo({ ...assetInfo, CategoryId: e.value });
  };

  const [err, setErr] = useState({ Check18YearsOld: "" });

  const onCreate = () => {
    dispatch(assetManage.add_asset(assetInfo));
  };


  useEffect(() => {
    setassetInfo({
      ...assetInfo,
      InstalledDate: InstalledDate != null ? InstalledDate : null,
    });
  }, [InstalledDate]);

  return (

    <div className="col-3">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <b>Create New Asset</b>
        </div>

        <div id="secondRowInRight">
          <div className="row mb-3">
            <div className="col-4">
              <label>Name</label>
            </div>
            <div className="col-8">
              <Input
                type="text"
                onChange={onChangeCreateAsset}
                name="Assetname"
              ></Input>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">
              <label>Category</label>
            </div>

            <div className="col-8">
              <Fragment>
                <Select
               
                  name="CategoryId"
                  options={getCategoryList.map((item, index) => {
                    return ({ "value": item.id, "label": item.categoryName })
                  })}
                  onChange={onSelectType}
                >
                </Select>

              </Fragment>

            </div>


            <div>
            </div>
            {popupAddNewCategory === false ? (

              <a href="#"  onClick={popupCategory} style={{ color: "red", fontSize: "12px", textAlign: "center" }}>New Category</a>
            ) : ""}

          </div>
          {popupAddNewCategory === true ? (

            <div className='row mb-3'>
              <div className="col-4"></div>
              <div className='col-8 pr-0'>
                <div className="row">
                  <div className='col-6'>
                    <input type="text" className="form-control" name='CategoryName' placeholder="Name"
                      onChange={onChangeCreateCategory} />
                  </div>
                  <div className='col-3 px-0'>
                    <input type="text" className="form-control" name='Prefix' placeholder="Prefix"
                      onChange={onChangeCreateCategory} />
                  </div>
                  <div className='col-1'>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color="red"
                      className="cursor ml-1"
                      onClick={CreateCategory}
                    />
                  </div>
                  <div className='col-1'>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cursor ml-1"
                      onClick={() => setPopupAddNewCategory(false)}
                    />

                  </div>
                </div>

              </div>

            </div>
          ) : ""}



          <div className="form-group row mb-3">
            <div className="col-4">
              <label>Specification</label>
            </div>
            <div className="col-8">
              <Input type="textarea" class="form-control" name="Specification" id="exampleText" onChange={onChangeCreateAsset} />
            </div>
          </div>




          <div className="form-group row mb-3">
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




          <div className="form-group row mb-3">
            <div className="col-4">
                State
            </div>
            <div className="col-8">
              <div className="radioBtnassetInfo">
                <Input
                  type="radio"
                  value={0}
                  name="StateAsset"
                  onChange={onChangeCreateAsset}
                />
                      Available
                    </div>
              <div className="">
                <Input
                  onChange={onChangeCreateAsset}
                  type="radio"
                  value={1}
                  name="StateAsset" />
                  Not available
              </div>
            </div>
          </div>

        </div>


        <div className="row mb-3">
          <div className="col-6"></div>
          <div className="col-3">
            <Button onClick={onCreate} color="danger">
              Create
                </Button>
          </div>
          <div className="col-3">
            <Button onClick={() => history.push("/asset")}>Cancel</Button>
          </div>
        </div>
      </div>
      {
        <Modal isOpen={modal} toggle={toggleModal} >
          <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <label>{getError}</label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { handleClick() }}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

      }

    </div>
  );
}
