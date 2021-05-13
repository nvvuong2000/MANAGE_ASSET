import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./components/home/Index";

import AssetPage from "./components/assets/Index";
import CreateAssetPage from "./components/assets/CreateAsset";
import EditAssetPage from "./components/assets/EditAsset";

import AssignmentPage from "./components/assignments/Index";
import CreateAssignmentPage from "./components/assignments/CreateAssignment";
import EditAssignmentPage from "./components/assignments/EditAssignment";

import ReportPage from "./components/reports/Index";

import ReturnRequestPage from "./components/return_request/Index";

import ManageUsersPage from "./components/users/Index";
import CreateUserPage from "./components/users/CreateUser";
import EditUserPage from "./components/users/EditUser";

import { useDispatch, useSelector } from "react-redux";
import * as userManage from "./actions/user";
import axios from "axios";
import "./App.css";
import Header from "./components/fragments/Header";
import LeftSession from "./components/fragments/LeftSession";

axios.interceptors.request.use((config) => {
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response.status) {
      window.location.href =
        "/Identity/Account/Login?returnUrl=" + window.location.pathname;
    } else {
      return Promise.reject(error);
    }
  }
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userManage.get_user_login());
  }, []);
  const getUserLogin = useSelector((state) => state.user.userLogin);
  let userLogin = getUserLogin;

  const [pageName, setPageName] = useState("");

  return (
    <BrowserRouter>
      <Header page={pageName}></Header>
      <div className="row">
        <div className="col-3">
          <LeftSession pageName={pageName}></LeftSession>
        </div>
        {userLogin.type == true ? (
          <Switch>
            <Route exact path="/">
              <HomePage setPageName={setPageName}></HomePage>
            </Route>

            <Route exact path="/asset">
              <AssetPage setPageName={setPageName}></AssetPage>
            </Route>
            <Route path="/asset/create">
              <CreateAssetPage setPageName={setPageName}></CreateAssetPage>
            </Route>
            <Route path="/asset/edit/:id">
              <EditAssetPage setPageName={setPageName}></EditAssetPage>
            </Route>

            <Route exact path="/assignment">
              <AssignmentPage setPageName={setPageName}></AssignmentPage>
            </Route>
            <Route path="/assignment/create">
              <CreateAssignmentPage
                setPageName={setPageName}
              ></CreateAssignmentPage>
            </Route>
            <Route path="/assignment/edit/:id">
              <EditAssignmentPage
                setPageName={setPageName}
              ></EditAssignmentPage>
            </Route>

            <Route exact path="/report">
              <ReportPage setPageName={setPageName}></ReportPage>
            </Route>

            <Route exact path="/return">
              <ReturnRequestPage setPageName={setPageName}></ReturnRequestPage>
            </Route>

            <Route exact path="/user">
              <ManageUsersPage setPageName={setPageName}></ManageUsersPage>
            </Route>
            <Route path="/user/create">
              <CreateUserPage
                setPageName={setPageName}
                userLogin={userLogin}
              ></CreateUserPage>
            </Route>
            <Route path="/user/edit/:id">
              <EditUserPage setPageName={setPageName}></EditUserPage>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <HomePage setPageName={setPageName}></HomePage>
            </Route>
          </Switch>
        )}{" "}
      </div>
    </BrowserRouter>
  );
}
export default App;
