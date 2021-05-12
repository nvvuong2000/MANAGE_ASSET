import React, { useState } from "react";
import "../../css/fragments_css/header.css";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Header(props) {
  const getUserList = useSelector((state) => state.user.userLogin);
  let userLogin = getUserList;

  const onLogout = () => { window.location.href ="/Identity/Account/Logout?returnUrl=" + window.location.pathname};

  const onChangePass=()=>{
    window.location.href ="/Identity/Account/Manage/ChangePassword?returnUrl=" + window.location.pathname
  }
  return (
    <div id="header">
      <label id="lblNav">{props.page}</label>
      <div id="dropdown-nav">
        <Dropdown>
          <Dropdown.Toggle variant="danger" size="sm" id="dropdown-basic">
            {userLogin.userName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onChangePass}>Change Password</Dropdown.Item>
            <Dropdown.Item  onClick={onLogout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
