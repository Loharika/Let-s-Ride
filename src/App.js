import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {observer,Provider} from 'mobx-react';

import {endPoints as AuthEndPoints} from './Authentication/constants';
import {endPoints as CommuteEndPoints} from './Commute/constants';
import {LogInPageRoute} from './Authentication/routes';
import {SignInFormRoute} from './Authentication/routes';
import DashBoardRoute from './Commute/routes/DashBoardRoute/DashBoardRoute.js';
import {UserProfile} from './Authentication/components/UserProfile/UserProfile.js';

import stores from './stores';

import "./App.css";

@observer
class App extends React.Component{

  render(){
  return (
    <Provider {...stores}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
      <Route exact path={AuthEndPoints.logInPage} component={LogInPageRoute}/>
      <Route exact path={AuthEndPoints.userProfile} component={UserProfile}/>
      <Route exact path={CommuteEndPoints.commuteDashBoard} component={DashBoardRoute}/>
      <Route exact path="/" component={SignInFormRoute}/>
      </Switch>
    </Router>
    </Provider>
  );
  }
}
export default App;
