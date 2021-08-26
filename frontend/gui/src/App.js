import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// layout
import "antd/dist/antd.css";
// components
import LayoutPattern from "./components/layout/LayoutPattern";
import LoginPage from "./components/utility_pages/LoginPage";
import AddTarget from "./components/add_target/AddTarget";
import UploadCSV from "./components/upload_csv/UploadCSV";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const EmailedList = lazy(() => import("./components/emailedList/EmailedList"));
const WithEmails = lazy(() => import("./components/emailStage/WithEmails"));
const WithoutEmails = lazy(() =>
  import("./components/emailStage/WithoutEmails")
);
const Connections = lazy(() => import("./components/connections/Connections"));

const App = () => {
  // ALL FORMATTING OF COMPONENTS USING ANT DESIGN IS ACCORDING TO THE DOCS;
  // IT'S NOT PRETTY BUT MAKES WORKFLOW FAST

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div className="lds-hourglass">Waiting</div>}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <LayoutPattern>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/emailed_list" component={EmailedList} />
              <Route path="/withEmails" component={WithEmails} />
              <Route path="/withoutEmails" component={WithoutEmails} />
              <Route exact path="/connections" component={Connections} />
              <Route exact path="/addTarget" component={AddTarget} />
              <Route exact path="/file_upload" component={UploadCSV} />
            </LayoutPattern>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
