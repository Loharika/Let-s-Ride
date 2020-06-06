import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { observer, Provider } from 'mobx-react'

import { endPoints as AuthEndPoints } from './Authentication/constants'
import { endPoints as CommuteEndPoints } from './Commute/constants'
import { LogInPageRoute } from './Authentication/routes'
import { SignInFormRoute } from './Authentication/routes'
import DashBoardRoute from './Commute/routes/DashBoardRoute/DashBoardRoute.js'
import UserProfile from './Authentication/components/UserProfile/UserProfile.js'
import { ProtectedRoute } from './Common/routes/ProtectedRoute'
import stores from './Common/stores'

import { AssetTransportRequest } from './Commute/components/AssetTransportRequest'
import { RideRequest } from './Commute/components/RideRequest'
import { ShareRide } from './Commute/components/ShareRide'
import { TravelInfo } from './Commute/components/TravelInfo'
import './App.css'

@observer
class App extends React.Component {
   render() {
      return (
         <Provider {...stores}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  <Route exact path='/login-page' component={LogInPageRoute} />
                  <Route
                     exact
                     path={'/commute-dashboard/user-profile'}
                     component={UserProfile}
                  />
                  <ProtectedRoute
                     exact
                     path='/commute-dashboard/home-page'
                     component={DashBoardRoute}
                  />
                  <ProtectedRoute
                     exact
                     path={'/sign-in'}
                     component={SignInFormRoute}
                  />
                  <ProtectedRoute
                     exact
                     path='/commute-dashboard/asset-transport-request'
                     component={AssetTransportRequest}
                  />
                  <ProtectedRoute
                     exact
                     path='/commute-dashboard/ride-request'
                     component={RideRequest}
                  />
                  <ProtectedRoute
                     exact
                     path='/commute-dashboard/share-ride'
                     component={ShareRide}
                  />
                  <ProtectedRoute
                     exact
                     path='/commute-dashboard/share-travelInfo'
                     component={TravelInfo}
                  />
               </Switch>
            </Router>
         </Provider>
      )
   }
}
export default App
