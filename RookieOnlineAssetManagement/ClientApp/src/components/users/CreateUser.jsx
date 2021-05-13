import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userManage from "../../actions/user";
import { Input, Button } from "reactstrap";
import "../../css/user_css/create.css";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";
import Popup from "reactjs-popup";
import DetailPopUp from "./DetailPopUp";
import DisablePopUp from "./DisablePopUp";

export default function CreateUser(props) {
  props.setPageName("Manage User > Create New User");
  const dispatch = useDispatch();
  const history = useHistory();

  const [joinedDate, setJoinedDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(
      joinedDate.getFullYear() - 18,
      joinedDate.getMonth(),
      joinedDate.getDate()
    )
  );

  const location = props.userLogin.location;
  const [createUser, setCreateUser] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: new Date(
      dateOfBirth.getFullYear(),
      dateOfBirth.getMonth(),
      dateOfBirth.getDate() + 1
    ),
    JoinedDate: joinedDate,
    Gender: null,
    Type: null,
    Location: "",
  });

  try {
    if (createUser.Location == "" && location != undefined) {
      setCreateUser({ ...createUser, Location: location });
    }
  } catch (err) {
    console.log(err);
  }

  const [btnDisable, setBtnDisable] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  };

  const onSelectType = (e) => {
    setCreateUser({ ...createUser, Type: e.value });
  };

  const [err, setErr] = useState({
    Check18YearsOld: "",
    ChooseWeekday: "",
    checkFirstName: "",
    checkLastName:""
  });

  useEffect(() => {
    if (
      createUser.FirstName !== "" &&
      createUser.LastName !== "" &&
      createUser.DateOfBirth !== null &&
      createUser.JoinedDate !== null &&
      createUser.Type !== null &&
      createUser.Gender !== null &&
      err.Check18YearsOld == "" &&
      err.ChooseWeekday == "" &&
      err.checkFirstName==""&&
      err.checkLastName==""
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [createUser,err]);

  useEffect(() => {
    const checkDay = joinedDate.getDate() - dateOfBirth.getDate();
    const checkMonth = joinedDate.getMonth() - dateOfBirth.getMonth();
    const checkYear = joinedDate.getFullYear() - dateOfBirth.getFullYear();
    if (
      (checkDay >= 0 && checkMonth == 0 && checkYear == 18) ||
      checkYear > 18 ||
      (checkYear == 18 && checkMonth > 0)
    ) {
      setErr({ ...err, Check18YearsOld: "" });
    } else {
      setErr({ ...err, Check18YearsOld: "Chưa đủ 18 tuổi !" });
    }
  }, [joinedDate, dateOfBirth]);

  useEffect(() => {
    if (joinedDate.getDay() == 6 || joinedDate.getDay() == 0) {
      setErr({ ...err, ChooseWeekday: "Không được chọn 2 ngày cuối tuần !" });
    } else {
      setErr({ ...err, ChooseWeekday: "" });
    }
  }, [joinedDate]);

  const onCreate = () => {
    dispatch(userManage.add_user(createUser));
  };

  const optionsType = [
    { value: true, label: "Admin" },
    { value: false, label: "Staff" },
  ];

  useEffect(() => {
    setCreateUser({
      ...createUser,
      DateOfBirth:
        dateOfBirth != null
          ? new Date(
              dateOfBirth.getFullYear(),
              dateOfBirth.getMonth(),
              dateOfBirth.getDate() + 1
            )
          : null,
    });
  }, [dateOfBirth]);

  useEffect(() => {
    setCreateUser({
      ...createUser,
      JoinedDate:
        joinedDate != null
          ? new Date(
              joinedDate.getFullYear(),
              joinedDate.getMonth(),
              joinedDate.getDate() + 1
            )
          : null,
    });
  }, [joinedDate]);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    var checkSpace = createUser.FirstName.split(" ");
    if (checkSpace.length > 1) {
      setErr({ ...err, checkFirstName: "Tên không được chứa khoảng trắng !" });
      setHide(false);
    } else {
      var checkNumber = createUser.FirstName.match(/\d+/g);
      if (checkNumber != null) {
        setErr({...err,checkFirstName:"Tên không được chứa số !"})
        setHide(false)
      } else {
        setErr({ ...err, checkFirstName: "" });
        setHide(true);
      }
    }
  }, [createUser.FirstName]);

  const [hideL, setHideL] = useState(true);
  useEffect(() => {
      var checkNumber = createUser.LastName.match(/\d+/g);
      if (checkNumber != null) {
        setErr({...err,checkLastName:"Họ không được chứa số !"})
        setHideL(false)
      } else {
        setErr({ ...err, checkLastName: "" });
        setHideL(true);
      }
  }, [createUser.LastName]);
  return (
    <div className="col-4">
      <div className="right_session">
        <div className="row" id="firstRowInRight">
          <b>Create New User</b>
        </div>

        <div id="secondRowInRight">
          <div className="row createUserRow">
            <div className="col-3">
              <label>First Name</label>
            </div>
            <div className="col-7">
              <Input type="text" onChange={onChange} name="FirstName"></Input>
              <label className="validateErr" hidden={hide}>
                {err.checkFirstName}
              </label>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-3">
              <label>Last Name</label>
            </div>
            <div className="col-7">
              <Input type="text" onChange={onChange} name="LastName"></Input>
              <label className="validateErr" hidden={hideL}>
                {err.checkLastName}
              </label>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-3">
              <label>Date of Birth</label>
            </div>
            <div className="col-7">
              <DateTimePicker
                onChange={setDateOfBirth}
                value={dateOfBirth}
                format="dd/MM/y"
                clearIcon
                maxDate={new Date()}
                className={
                  err.Check18YearsOld != ""
                    ? "dateTimeCreateUserErr"
                    : "dateTimeCreateUser"
                }
              ></DateTimePicker>
              <label className="validateErr">{err.Check18YearsOld}</label>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-3">
              <label>Gender</label>
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col-4 radioBtnCreateUser">
                  <Input
                    className="radioBtn"
                    type="radio"
                    value={true}
                    onClick={() =>
                      setCreateUser({ ...createUser, Gender: true })
                    }
                    checked={createUser.Gender === true}
                  />{" "}
                  Male
                </div>
                <div className="col-4">
                  <Input
                    className="radioBtn"
                    type="radio"
                    value={false}
                    onClick={() =>
                      setCreateUser({ ...createUser, Gender: false })
                    }
                    checked={createUser.Gender === false}
                  />{" "}
                  Female
                </div>
              </div>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-3">
              <label>Joined Date</label>
            </div>
            <div className="col-7">
              <DateTimePicker
                format="dd/MM/y"
                onChange={setJoinedDate}
                value={joinedDate}
                clearIcon
                minDate={dateOfBirth}
                className={
                  err.ChooseWeekday != ""
                    ? "dateTimeCreateUserErr"
                    : "dateTimeCreateUser"
                }
              ></DateTimePicker>
              <label className="validateErr">{err.ChooseWeekday}</label>
            </div>
          </div>

          <div className="row createUserRow">
            <div className="col-3">
              <label>Type</label>
            </div>
            <div className="col-7">
              <Select options={optionsType} onChange={onSelectType}></Select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-3">
            <Button onClick={onCreate} disabled={btnDisable} color="danger">
              Create
            </Button>
          </div>
          <div className="col-3">
            <Button onClick={() => history.push("/user")}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
