import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as assetManage from "../../actions/asset";
import { useDispatch, useSelector } from "react-redux";
import "../../css/asset_css/index.css";

export default function DetailPopUp(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(assetManage.get_asset_history(props.assetId));
  }, []);

  const getAssetHistory = useSelector((state) => state.asset.assetHistory);
  const [assetHistory, setAssetHistory] = useState({});

  useEffect(() => {
    setAssetHistory(getAssetHistory);
  }, [getAssetHistory]);

  const format = (value) => {
    try {
      let subString = value.substring(0, 10)
      let split = subString.split("-")
      return split[1] + "/" + split[2] + "/" + split[0]
    } catch (error) {
    }
  }

  return (
    <div className="popupDisable">
      <div className="row row1">
        <div className="col-6">
          <label>Detailed Asset Information</label>
        </div>
        <div className="col-6">
          <FontAwesomeIcon icon={faWindowClose} className="cursor" onClick={props.close} id="closeDetail" />
        </div>
      </div>
      <div className="row detailAssetPopUp">
        <div className="row" >
          <div className="col-4">
            <label>Asset Code</label>
          </div>
          <div className="col-8">
            <label>{assetHistory.assetCode}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Asset Name</label>
          </div>
          <div className="col-8">
            <label>{assetHistory.assetName}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Category</label>
          </div>
          <div className="col-8">
            <label>{assetHistory.categoryName}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Installed Date</label>
          </div>
          <div className="col-8">
            <label>{format(assetHistory.installedDate)}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label>State</label>
          </div>
          <div className="col-8">
            <label>{assetHistory.stateName}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label>Location</label>
          </div>
          <div className="col-8">
            <label>{assetHistory.location}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label>Specification</label>
          </div>
          <div className="col-8">
            <label>{assetHistory.specification}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>History</label>
          </div>
          </div>
          <div className="row">
          <div className='col-12'>
            <div id="table-wrapper">
              <div id="table-scroll">
            <Table responsive>
              <thead style={{fontSize:"13px"}}>
                <tr>
                  <th>Date</th>
                  <th>Assigned to</th>
                  <th>Assigned by</th>
                  <th>Returned Date</th>
                </tr>
              </thead>
              <tbody>
                {assetHistory.assetHistories && assetHistory.assetHistories.map((history, index) => (
                  <tr>
                    <td className="cursor">{format(history.dateAssigned)}</td>
                    <td className="cursor">{history.assignedTo}</td>
                    <td className="cursor">{history.assignedBy}</td>
                    <td className="cursor">{format(history.returnedDate)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
