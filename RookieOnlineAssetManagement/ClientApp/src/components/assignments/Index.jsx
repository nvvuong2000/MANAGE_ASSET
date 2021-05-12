import React from "react";
import Select from "react-select";
import { Button, Input, Table } from "reactstrap";
import "../../css/user_css/index.css";
import {
  faPen,
  faTimesCircle,
  faSearch,faUndoAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import DateTimePicker from "react-datetime-picker";
import {useHistory} from 'react-router-dom';
import ReturnPopup from '../home/ReturnPopUp';
import DeletePopup from './DeletePopUp'

export default function Index(props) {
  props.setPageName("Manage Assignment");
  const history=useHistory();

  return (
    <div className="col-8">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <div className="col-12">
            <b>Assignment List</b>
          </div>
        </div>

        <div className="row" id="secondRowInRight">
          <div className="col-2">
            <Select placeholder="State"></Select>
          </div>
          <div className="col-2">
            <DateTimePicker format="dd/MM/y" clearIcon className="dateTimeCreateUser"></DateTimePicker>
          </div>
          <div className="col-1">
          </div>
          <div className="col-3" id="searchInput">
            <Input></Input>
            <Button color="primary"><FontAwesomeIcon icon={faSearch} /></Button>
          </div>
          <div className="col-3">
            <Button color="danger" onClick={()=>history.push('/assignment/create')}>Create new assignment</Button>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Asset Code</th>
              <th>Asset Name</th>
              <th>Assigned to</th>
              <th>Assigned by</th>
              <th>Assigned Date</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>1</td>
                <td>LA000001</td>
                <td>Laptop HP Probook</td>
                <td>dattt</td>
                <td>dattt1</td>
                <td>12/10/2020</td>
                <td>Accepted</td>
                <td id="userListLastTd"><FontAwesomeIcon icon={faPen} className="cursor" onClick={()=>history.push('/assignment/edit/1')}/></td>
                <td id="userListLastTd">
                  <Popup modal trigger={ <FontAwesomeIcon icon={faTimesCircle} color="rgb(207, 35, 56)" className="cursor"/>}>  
                  {close=><DeletePopup close={close}></DeletePopup>}</Popup>
                </td>
                <td id="userListLastTd"><Popup modal trigger={ <FontAwesomeIcon icon={faUndoAlt}  color="blue" className="cursor"/>}>
                  {close=><ReturnPopup close={close}></ReturnPopup>}</Popup></td>
              </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
