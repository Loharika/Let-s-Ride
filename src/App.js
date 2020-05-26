import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {observer,Provider} from 'mobx-react';
import HomePage from "./components/HomePage";
import Page1 from "./components/Page1";
import {endPoints} from './Authentication/EndPoints';
import LogInPageRoute from './Authentication/Routes/LogInFormRoute.js';;
import SignInFormRoute from './Authentication/Routes/SignInFormRoute.js';;
import {UserProfile} from './Authentication/Components/UserProfile/userProfile.js';
import {ProtectedRoute} from './Common/ProtectedRoute';
import stores from './stores';

import "./App.css";

@observer
class App extends React.Component{

  render(){
  return (
    <Provider {...stores}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
      <Route exact path="/login-page">
          <LogInPageRoute />
       </Route>
      <ProtectedRoute exact path={endPoints.userProfilePath} component={UserProfile}/>
        <Route path="/">
          <SignInFormRoute />
        </Route>
        </Switch>
    </Router>
    </Provider>
  );
  }
}
export default App;
