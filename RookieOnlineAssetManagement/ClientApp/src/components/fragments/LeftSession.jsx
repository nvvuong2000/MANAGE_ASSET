import React from "react";
import "../../css/fragments_css/left_session.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function LeftSession(props) {
  const getUserLogin = useSelector((state) => state.user.userLogin);
  let userLogin = getUserLogin;

  return (
    <div className="row" id="left_session">
      <div className="col-2"></div>
      <div className="col-8">
        <img src="/images/Logo_lk.png" alt="Rookie_logo" id="rookie_logo"></img>
        <label id="lbl_left_session" className="translate_left_session">
          Online Asset Management
        </label>
        {userLogin.type == true ? (
          <div className="menu">
            <Link to="/">
              <button
                className="menuBtn"
                style={
                  props.pageName.startsWith("Home")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }
              >
                Home
              </button>
            </Link>
            <Link to="/user">
              <button
                className="menuBtn"
                style={
                  props.pageName.startsWith("Manage User")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }
              >
                Manage User
              </button>
            </Link>
            <Link to="/asset">
              <button
                className="menuBtn"
                style={
                  props.pageName.startsWith("Manage Asset")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }
              >
                Manage Asset
              </button>
            </Link>
            <Link to="/assignment">
              <button
                className="menuBtn"
                style={
                  props.pageName.startsWith("Manage Assignment")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }
              >
                Manage Assignment
              </button>
            </Link>
            <Link to="/return">
              <button
                className="menuBtn"
                style={
                  props.pageName.startsWith("Request for Returning")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }
              >
                Request for Returning
              </button>
            </Link>
            <Link to="/report">
              <button
                className="menuBtn"
                style={
                  props.pageName.startsWith("Report")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }
              >
                Report
              </button>
            </Link>
          </div>
        ) : (
          <div className="menu">
            <Link to="/">
              <button className="menuBtn" style={
                  props.pageName.startsWith("Home")
                    ? { backgroundColor: "rgb(207, 35, 56)", color: "white" }
                    : { background: "rgb(239, 241, 245)" }
                }>Home</button>
            </Link>
          </div>
        )}
      </div>
      <div className="col-2"></div>
    </div>
  );
}
