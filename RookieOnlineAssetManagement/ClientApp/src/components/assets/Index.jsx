import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as assetManage from "../../actions/asset";
import * as categoryManage from "../../actions/category";
import { Dropdown } from "react-bootstrap";
import { Button, Input, Table } from "reactstrap";
import "../../css/user_css/index.css";
import "../../css/asset_css/index.css";
import "../../css/user_css/create.css";

import { faPen, faTimesCircle, faSearch, faFilter, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import DetailPopUp from "./DetailPopUp";

export default function Index(props) {
  props.setPageName("Manage Asset");

  const dispatch = useDispatch();
  const history = useHistory();

  const format = (value) => {
    let subString = value.substring(0, 10)
    let split = subString.split("-")
    return split[1] + "/" + split[2] + "/" + split[0]
  }

  useEffect(() => {
    dispatch(assetManage.get_asset_state_list());
    dispatch(categoryManage.get_category_list());
    // dispatch(assetManage.get_asset_list());
  }, []);

  const [page, setPage] = useState(1);
  console.log(page)
  const [arrCateIdSelected, setarrCateIdSelected] = useState([-1]);
  const [arrStateIdSelected, setarrStateIdSelected] = useState([-1]);
  const [keyword, setKeyword] = useState("");
  const [sortList, setSortList] = useState({ Column: "", sortASC: false })
  const sort = (sortBy) => {
    setSortList({ Column: sortBy, sortASC: !sortList.sortASC })
  };
  useEffect(() => {
    const data = {
      "categories": arrCateIdSelected,
      "states": arrStateIdSelected,
      "keyword": keyword,
      "column": sortList.Column,
      "sortASC": sortList.sortASC,
    }
    // console.log(data);
    dispatch(assetManage.get_asset_list(data, page));
    console.log(data);
  }, [arrCateIdSelected, arrStateIdSelected, keyword, sortList, page])
  //  keyword, sortList])
  //  Array Filter Selected 

  // Category:
  const [arrCateSelected, setarrCateSelected] = useState([]);

  // Statte:
  const [arrStateSelected, setarrStateSelected] = useState([]);

  //  End Array Filter Selected 


  const updateCategoryList = (e, value) => {
    if (e.target.checked) {
      setarrCateIdSelected(arrCateIdSelected.filter(function (val) { return val !== -1 }))
      setarrCateIdSelected(oldArray => [...oldArray, value.id]);
      setarrCateSelected(oldArray => [...oldArray, value.categoryName]);

    } else {
      setarrCateIdSelected(arrCateIdSelected.filter(function (val) { return val !== value.id }))
      setarrCateSelected(arrCateSelected.filter(function (val) { return val !== value.categoryName }))
    }

  }
  const updateStateList = (e, value) => {
    if (e.target.checked) {
      setarrStateIdSelected(arrStateIdSelected.filter(function (val) { return val !== -1 }));
      setarrStateIdSelected(oldArray => [...oldArray, value.key]);
      setarrStateSelected(oldArray => [...oldArray, value.name]);

    } else {
      setarrStateIdSelected(arrStateIdSelected.filter(function (val) { return val !== value.key }));
      setarrStateSelected(arrStateSelected.filter(function (val) { return val !== value.name }))
    }
  }
  //  When click checbox ALL
  const checkAll = (value) => {
    if (value === true) {
      setarrCateIdSelected([-1]);
      // setarrCateSelected("All")

    }
    else {
      // setarrStateSelected("All")
      setarrStateIdSelected([-1]);

    }



  }

  const getCategoryList = useSelector((state) => state.category.categoryList);
  const pageList = useSelector((state) => state.asset.page);
  console.log(pageList);
  const disabledAsset = (id) => {
    dispatch(assetManage.disableAsset(id))
  }

  const getAssetList = useSelector((state) => state.asset.assetList);
  const getStateAssetList = useSelector((state) => state.asset.assetStateList);
  const [assetList, setAssetList] = useState([]);

  useEffect(() => {
    setAssetList(getAssetList);
  }, [getAssetList]);

  const pushToCreateAssetPage = () => {
    history.push("/asset/create");
  };
  //const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  }


  const [option, setOption] = useState("Type");

  return (
    <div className="col-7">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <div className="col-12">
            <b>Asset List</b>
          </div>
        </div>

        <div className="row" id="secondRowInRight">

          <div className="col-3">
            <Dropdown >

              <Dropdown.Toggle className="dropdownFilter">
                <div className="row">
                  <div className="col-4">{arrStateSelected.length === 0 ? "State" : arrStateSelected.length === 1 ? arrStateSelected : arrStateSelected.length + " selected"}</div>
                  <div className="col-2"></div>
                  <div className="col-1 iconDropdown"></div>
                  <div className="col-2">
                    <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdownMenu">

                <div>
                  <label className="checkbox-inline">
                    <input type="checkbox" name="StateAsset" onClick={() => checkAll(false)}
                    // onClick={(e) => updateStateList(e, item)} 
                    /> All
                      </label>
                </div>
                {
                  getStateAssetList && getStateAssetList.map((item) => {

                    if (item.name === "Assigned") {
                    }
                    else {
                      return (
                        <div>
                          <label className="checkbox-inline">
                            <input type="checkbox" value={item.key} name="StateAsset" onClick={(e) => updateStateList(e, item)} /> {item.name}
                          </label>
                        </div>
                      )
                    }
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-3">
            <Dropdown >
              <Dropdown.Toggle className="dropdownFilter">
                <div className="row">
                  {/* <div className="col-4">Category</div> */}
                  <div className="col-4">{arrCateSelected.length === 0 ? "Category" : arrCateSelected.length === 1 ? arrCateSelected : arrCateSelected.length + " selected"}</div>
                  <div className="col-2"></div>
                  <div className="col-1 iconDropdown"></div>
                  <div className="col-2">
                    <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenu">

                <div>
                  <label className="checkbox-inline">
                    <input type="checkbox" name="StateAsset" onClick={() => checkAll(true)}
                    // onClick={(e) => updateStateList(e, item)} 
                    /> All
                      </label>
                </div>
                {
                  getCategoryList && getCategoryList.map((item) => {

                    return (
                      <div>
                        <label className="checkbox-inline">
                          <input type="checkbox" value={item.id} name="StateAsset" onClick={(e) => updateCategoryList(e, item)} /> {item.categoryName}
                        </label>
                      </div>
                    )
                  }
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-3" id="searchInput">
            <Input type="text" name="keyword" onChange={(e) => setKeyword(e.target.value)} ></Input>
            <Button color="primary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
          <div className="col-3">
            <Button color="danger" onClick={pushToCreateAssetPage}>
              Create new asset
            </Button>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th onClick={() => sort("ID")} className="columnSort">Asset Code
              {sortList.Column == "ID" && sortList.sortASC == true ? <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon> :
                  sortList.Column == "ID" && sortList.sortASC == false ? <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon> :
                    <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>
              {/* <th>Asset Code</th> */}
              {/* <th>Asset Name</th> */}
              <th onClick={() => sort("Name")} className="columnSort">Asset Name
              {sortList.Column == "Name" && sortList.sortASC == true ? <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon> :
                  sortList.Column == "Name" && sortList.sortASC == false ? <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon> :
                    <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>
              <th onClick={() => sort("Category")} className="columnSort">Asset Code
              {sortList.Column == "Category" && sortList.sortASC == true ? <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon> :
                  sortList.Column == "Category" && sortList.sortASC == false ? <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon> :
                    <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>
              <th onClick={() => sort("State")} className="columnSort">Asset Code
              {sortList.Column == "State" && sortList.sortASC == true ? <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon> :
                  sortList.Column == "State" && sortList.sortASC == false ? <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon> :
                    <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>

              {/* <th>Category</th>
              <th>State</th> */}
            </tr>
          </thead>
          <tbody>
            {assetList.map((asset, index) => (
              <tr key={index}>
                <Popup modal trigger={
                  <td className="cursor">{asset.assetCode}</td>
                }>
                  {(close) => (
                    <DetailPopUp close={close} assetId={asset.assetCode}></DetailPopUp>
                  )}
                </Popup>

                <Popup modal trigger={
                  <td className="cursor">{asset.assetName}</td>
                }>
                  {(close) => (
                    <DetailPopUp close={close} assetId={asset.assetCode}></DetailPopUp>
                  )}
                </Popup>
                <Popup modal trigger={
                  <td className="cursor">{asset.categoryName}</td>
                }>
                  {(close) => (
                    <DetailPopUp close={close} assetId={asset.assetCode}></DetailPopUp>
                  )}
                </Popup>
                <Popup modal trigger={
                  <td className="cursor">{asset.stateName}</td>
                }>
                  {(close) => (
                    <DetailPopUp close={close} assetId={asset.assetCode}></DetailPopUp>
                  )}
                </Popup>
                <td id="userListLastTd">
                  <FontAwesomeIcon icon={faPen} className="cursor" onClick={() => history.push(`/asset/edit/${asset.assetCode}`)} />
                </td>
                <td id="userListLastTd">
                  <FontAwesomeIcon icon={faTimesCircle} color="rgb(207, 35, 56)" className="cursor" onClick={() => { disabledAsset(asset.assetCode) }} />
                </td>
              </tr>
            ))}
          </tbody>

          {/*  */}


          <ul class="pagination justify-content-end pagination-sm justify-content-right text-danger">
            <li class="page-item ">
              <button type="button"
                onClick={goToPreviousPage}
                disabled={page === 1 ? true : false}
                className={page === 1 ? "disabled page-link" : "page-link"}
              >
                Previous
        </button>
            </li>
            {/* <li className="page-item"><a class="page-link" href="#">Previous</a></li> */}
            {pageList && pageList.map((item, index) => {

              //return (<li onClick={() => setPage(item)} key={index} className={`page-link ${page === item ? "active" : null}`}><a >{index + 1}</a></li>)
              return (<li className="page-item ">
                <a type="button"
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`page-link ${page === index + 1 ? "active" : null}`}
                >
                  <span>{index + 1}</span>
                </a>
              </li>
              )
            })}
            <li class="page-item ">
              <button type="button"
                onClick={goToNextPage}
                disabled={page === pageList.length ? true : false}
                className={page === pageList.length ? "disabled page-link" : "page-link"}
              >
                Next
        </button>
            </li>
            {/* <li className="page-item"><a class="page-link" href="#">Next</a></li> */}
          </ul>
        </Table>
      </div>
    </div>
  );
}
