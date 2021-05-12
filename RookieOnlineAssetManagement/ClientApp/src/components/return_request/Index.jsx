import React from "react";
import Select from "react-select";
import { Button, Input, Table } from "reactstrap";
import "../../css/user_css/index.css";
import { faCheck, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import DateTimePicker from "react-datetime-picker";
import AcceptPopUp from './AcceptPopUp';
import DenyPopUp from './DenyPopUp';

export default function Index(props) {
  props.setPageName("Request for Returning");
  return (
    <div className="col-8">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <div className="col-12">
            <b>Request List</b>
          </div>
        </div>

        <div className="row" id="secondRowInRight">
          <div className="col-2">
            <Select placeholder="State"></Select>
          </div>
          <div className="col-2">
            <DateTimePicker
              format="dd/MM/y"
              clearIcon
              className="dateTimeCreateUser"
              placeholder="Returned Date"
            ></DateTimePicker>
          </div>
          <div className="col-4"></div>
          <div className="col-3" id="searchInput">
            <Input></Input>
            <Button color="primary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th>No.</th>
              <th>Asset Code</th>
              <th>Asset Name</th>
              <th>Requested by</th>
              <th>Assigned Date</th>
              <th>Accepted by</th>
              <th>Returned Date</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>LA000001</td>
              <td>Laptop HP Probook</td>
              <td>dattt1</td>
              <td>12/12/2020</td>
              <td>dattt</td>
              <td>13/12/2020</td>
              <td>Completed</td>
              <td id="userListLastTd">
                <Popup
                  modal
                  trigger={
                    <FontAwesomeIcon
                      icon={faCheck}
                      color="rgb(207, 35, 56)"
                      className="cursor"
                    />
                  }
                >
                  {close=><AcceptPopUp close={close}></AcceptPopUp>}
                </Popup>
              </td>
              <td id="userListLastTd">
                <Popup
                  modal
                  trigger={
                    <FontAwesomeIcon icon={faTimes} className="cursor" />
                  }
                >
                  {close=><DenyPopUp close={close}></DenyPopUp>}
                </Popup>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
