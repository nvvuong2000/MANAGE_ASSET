import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userManage from "../../actions/user";
import Select from "react-select";
import { Dropdown } from "react-bootstrap";
import { Button, Input, Table } from "reactstrap";
import "../../css/user_css/index.css";
import {
  faPen,
  faTimesCircle,
  faSearch,
  faFilter,faCaretDown,faCaretUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import DisablePopUp from "./DisablePopUp";
import DetailPopUp from "./DetailPopUp";

export default function Index(props) {
  props.setPageName("Manage User");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(userManage.get_user_list());
  }, []);

  const getUserList = useSelector((state) => state.user.userList);
  const [userList, setUserList] = useState([]);

  const pushToCreateUserPage = () => {
    history.push("/user/create");
  };

  const [searchInput, setSearchInput] = useState({
    InputSearch: "",
    TypeSearch: "Type",
  });
  // const onChangeSearch = (e) => {
  //   setSearchInput({ ...searchInput, InputSearch: e.target.value });
  // };

  const onDisableUser = (id) => {
    dispatch(userManage.disable_user(id));
  };

  const onFilterType = (e) => {
    const {name,value}=e.target
    setSearchInput({ ...searchInput, [name]: value });
  };

  useEffect(()=>{
    dispatch(userManage.search_user(searchInput));
  },[searchInput])
  
  const [sortList,setSortList]=useState({Column:"",sortASC:false})
  const sort = (sortBy) => {
    setSortList({Column:sortBy,sortASC:!sortList.sortASC})
  };
  console.log(sortList)
  useEffect(()=>{
    dispatch(userManage.sort_user(sortList));
  },[sortList])

  useEffect(() => {
    setUserList(getUserList);
  }, [getUserList]);
  

  return (
    <div className="col-7">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <div className="col-12">
            <b>User List</b>
          </div>
        </div>

        <div className="row" id="secondRowInRight">
          <div className="col-3">
            <Dropdown >
              <Dropdown.Toggle className="dropdownFilter">
                <div className="row">
                  <div className="col-4">{searchInput.TypeSearch}</div>
                  <div className="col-2"></div>
                  <div className="col-1 iconDropdown"></div>
                  <div className="col-2">
                    <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdownMenu">
                <Input
                  type="checkbox"
                  value="All"
                  onClick={onFilterType} name="TypeSearch"
                  checked={searchInput.TypeSearch == "All"}
                ></Input>
                <label className="lblMenuDropdown">All</label>
                <br></br>
                <Input
                  type="checkbox"
                  value="Admin"
                  onClick={onFilterType} name="TypeSearch"
                  checked={searchInput.TypeSearch == "Admin"}
                ></Input>
                <label className="lblMenuDropdown">Admin</label>
                <br></br>
                <Input
                  type="checkbox"
                  value="Staff"
                  onClick={onFilterType} name="TypeSearch"
                  checked={searchInput.TypeSearch == "Staff"}
                ></Input>
                <label className="lblMenuDropdown">Staff</label>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-2"></div>
          <div className="col-4" id="searchInput">
            <Input onChange={onFilterType} name="InputSearch"></Input>
            <Button color="primary" id="searchBtn">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
          <div className="col-3">
            <Button color="danger" onClick={pushToCreateUserPage}>
              Create new user
            </Button>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th onClick={()=>sort("StaffCode")} className="columnSort">Staff Code 
              {sortList.Column=="StaffCode"&&sortList.sortASC==true?<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>:
              sortList.Column=="StaffCode"&&sortList.sortASC==false?<FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>:
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>

              <th onClick={()=>sort("LastName")} className="columnSort">Full Name
              {sortList.Column=="LastName"&&sortList.sortASC==true?<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>:
              sortList.Column=="LastName"&&sortList.sortASC==false?<FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>:
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>

              <th>Username</th>

              <th onClick={()=>sort("JoinedDate")} className="columnSort">JoinedDate
              {sortList.Column=="JoinedDate"&&sortList.sortASC==true?<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>:
              sortList.Column=="JoinedDate"&&sortList.sortASC==false?<FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>:
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>

              <th onClick={()=>sort("Type")} className="columnSort">Type
              {sortList.Column=="Type"&&sortList.sortASC==true?<FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>:
              sortList.Column=="Type"&&sortList.sortASC==false?<FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon>:
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>}</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <td>{user.staffCode}</td>
                <Popup
                  modal
                  trigger={
                    <td className="cursor">
                      {user.lastName + " " + user.firstName}
                    </td>
                  }
                >
                  {(close) => (
                    <DetailPopUp close={close} user={user}></DetailPopUp>
                  )}
                </Popup>

                <td>{user.userName}</td>

                <Popup
                  modal
                  trigger={
                    <td className="cursor">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </td>
                  }
                >
                  {(close) => (
                    <DetailPopUp close={close} user={user}></DetailPopUp>
                  )}
                </Popup>

                <Popup
                  modal
                  trigger={
                    <td className="cursor">{user.type ? "Admin" : "Staff"}</td>
                  }
                >
                  {(close) => (
                    <DetailPopUp close={close} user={user}></DetailPopUp>
                  )}
                </Popup>

                <td id="userListLastTd">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="cursor"
                    onClick={() => history.push(`/user/edit/${user.id}`)}
                  />
                </td>
                <td id="userListLastTd">
                  <Popup
                    modal
                    trigger={
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        color="rgb(207, 35, 56)"
                        className="cursor"
                      />
                    }
                  >
                    {(close) => (
                      <DisablePopUp
                        close={close}
                        userId={user.id}
                        onDisableUser={onDisableUser}
                      ></DisablePopUp>
                    )}
                  </Popup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
