import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as assetManage from "../../actions/asset";
import { Dropdown } from "react-bootstrap";
import { Button, Input, Table } from "reactstrap";
import "../../css/user_css/index.css";
import { faPen, faTimesCircle, faSearch, faFilter, } from "@fortawesome/free-solid-svg-icons";
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
    dispatch(assetManage.get_asset_list());
  }, []);

  const getAssetList = useSelector((state) => state.asset.assetList);
  const [assetList, setAssetList] = useState([]);

  useEffect(() => {
    setAssetList(getAssetList);
  }, [getAssetList, props]);

  const pushToCreateAssetPage = () => {
    history.push("/asset/create");
  };

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
            <Dropdown className="dropdownFilter">
              <Dropdown.Toggle className="customBtn">
                <div className="row">
                  <div className="col-4">State</div>
                  <div className="col-2"></div>
                  <div className="col-1 iconDropdown"></div>
                  <div className="col-2"><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenu">
                <Input type="checkbox" value="All" checked={option == "All"}></Input>
                <label className="lblMenuDropdown">All</label><br></br>

                <Input type="checkbox" value="Admin" checked={option == "Admin"}></Input>
                <label className="lblMenuDropdown">Assigned</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Available</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Not available</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Waiting for recycling</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Recycled</label>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-3">
            <Dropdown className="dropdownFilter ">
              <Dropdown.Toggle className="customBtn">
                <div className="row">
                  <div className="col-4">State</div>
                  <div className="col-2"></div>
                  <div className="col-1 iconDropdown"></div>
                  <div className="col-2"><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenu">
                <Input type="checkbox" value="All" checked={option == "All"} ></Input>
                <label className="lblMenuDropdown">All</label><br></br>

                <Input type="checkbox" value="Admin" checked={option == "Admin"}></Input>
                <label className="lblMenuDropdown">Assigned</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Available</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Not available</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Waiting for recycling</label><br></br>

                <Input type="checkbox" value="Staff" checked={option == "Staff"}></Input>
                <label className="lblMenuDropdown">Recycled</label>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-3" id="searchInput">
            <Input></Input>
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
              <th>Asset Code</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {assetList.map((asset, index) => (
              <tr key={index}>
                <Popup modal trigger={
                  <td className="cursor">{asset.assetCode}</td>
                }>
                  {(close) => (
                    <DetailPopUp close={close} assetId={asset}></DetailPopUp>
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
                  <FontAwesomeIcon icon={faPen} className="cursor" onClick={() => history.push(`/user/edit/`)} />
                </td>
                <td id="userListLastTd">
                  <FontAwesomeIcon icon={faTimesCircle} color="rgb(207, 35, 56)" className="cursor" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
