import React from "react";
import {  Button } from "reactstrap";
import "../../css/user_css/create.css";
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";
import {useHistory} from 'react-router-dom';

export default function CreateAssignment(props) {
  props.setPageName("Manage Assignment > Edit Assignment");
  const history=useHistory();

  return (
    <div className="col-3">
      <div className="right_session">
      <div className="row" id="firstRowInRight">
          <b>Edit Assignment</b>
        </div>

        <div id="secondRowInRight">
          <div className="row createUserRow">
            <div className="col-4">
              <label>User</label>
            </div>
            <div className="col-8">
              <Select></Select>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-4">
              <label>Asset</label>
            </div>
            <div className="col-8">
              <Select></Select>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-4">
              <label>Assigned Date</label>
            </div>
            <div className="col-8">
              <DateTimePicker format="dd/MM/y" clearIcon className="dateTimeCreateUser" value={new Date()}></DateTimePicker>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-4">
              <label>Note</label>
            </div>
            <div className="col-8">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
          </div>

          <div className="row" style={{marginTop:'15px'}}>
            <div className="col-6"></div>
            <div className="col-3">
              <Button color="danger">Save</Button>
            </div>
            <div className="col-3">
              <Button onClick={()=>history.push('/assignment')}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
