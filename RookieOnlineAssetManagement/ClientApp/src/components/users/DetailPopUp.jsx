import React from "react";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DetailPopUp(props) {
  const format=(value)=>{
    let subString=value.substring(0,10)
    let split=subString.split("-")
    return split[1]+"/"+split[2]+"/"+split[0]
  }
  const date=format(props.user.dateOfBirth)
  const join=format(props.user.joinedDate)
  return (
    <div className="popupDisable">
      <div className="row row1">
        <div className="col-6">
          <label>Detailed User Information</label>
        </div>
        <div className="col-6">
          <FontAwesomeIcon
            icon={faWindowClose}
            className="cursor"
            onClick={props.close}
            id="closeDetail"
          />
        </div>
      </div>
      <div className="row detailUserPopUp">
        <div className="row">
          <div className="col-4">
            <label>Staff Code</label>
          </div>
          <div className="col-8">
            <label>{props.user.staffCode}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Full Name</label>
          </div>
          <div className="col-8">
            <label>{props.user.fullName}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>User Name</label>
          </div>
          <div className="col-8">
            <label>{props.user.userName}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Date of Birth</label>
          </div>
          <div className="col-8">
            <label>{date}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Gender</label>
          </div>
          <div className="col-8">
            <label>{props.user.gender == true ? "Male" : "Female"}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Joined Date</label>
          </div>
          <div className="col-8">
            <label>{join}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Type</label>
          </div>
          <div className="col-8">
            <label>{props.user.type == true ? "Admin" : "Staff"}</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label>Location</label>
          </div>
          <div className="col-8">
            <label>{props.user.location}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
