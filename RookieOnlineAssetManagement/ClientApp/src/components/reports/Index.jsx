import React from "react";
import { Button, Table } from "reactstrap";
import "../../css/user_css/index.css";
import {
  faPen,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";

export default function Index(props) {
  props.setPageName("Report");
  return (
    <div className="col-7">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <div className="col-12">
            <b>Report</b>
          </div>
        </div>

        <div className="row" id="secondRowInRight">
          <div className="col-10">
          </div>
          <div className="col-2">
            <Button color="danger">Export</Button>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
              <th>Assigned</th>
              <th>Available</th>
              <th>Not Available</th>
              <th>Waiting for recycling</th>
              <th>Recycled</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>Laptop</td>
                <td>1000</td>
                <td>550</td>
                <td>450</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
