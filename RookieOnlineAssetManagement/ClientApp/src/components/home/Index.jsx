import React from "react";
import { Table } from "reactstrap";
import "../../css/user_css/index.css";
import {
  faCheck,
  faTimes,
  faUndoAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import AcceptPopUp from './AcceptPopUp';
import DeniPopUp from './DeniPopUp';
import ReturnPopUp from './ReturnPopUp';

export default function Index(props) {
  props.setPageName("Home");
  return (
    <div className="col-6">
      <div className="right_session">
      <div className="row" id="firstRowInRight">
          <div className="col-12">
            <b>My Assignment</b>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th>Asset Code</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Assigned Date</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>LA000001</td>
                <td>Laptop HP Probook</td>
                <td>Laptop</td>
                <td>12/10/2020</td>
                <td>Accepted</td>
                <td id="userListLastTd"> <Popup modal trigger={ <FontAwesomeIcon icon={faCheck}  color="rgb(207, 35, 56)" className="cursor"/>}>
                  {close=><AcceptPopUp close={close}></AcceptPopUp>}</Popup></td>
                <td id="userListLastTd">
                  <Popup modal trigger={ <FontAwesomeIcon icon={faTimes} className="cursor"/>}>{close=><DeniPopUp close={close}></DeniPopUp>}</Popup>
                </td>
                <td id="userListLastTd"><Popup modal trigger={ <FontAwesomeIcon icon={faUndoAlt}  color="blue" className="cursor"/>}>
                  {close=><ReturnPopUp close={close}></ReturnPopUp>}</Popup></td>
              </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
