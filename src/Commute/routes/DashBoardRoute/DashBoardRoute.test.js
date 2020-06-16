/*global expect*/
/*global jest*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'


import DashBoardRoute from './DashBoardRoute.js'

import { CommuteService } from '../../services/CommuteService/CommuteService.fixture.js'
import { CommuteStore } from '../../stores/CommuteStore';
import {authStore} from '../../../Common/stores'
const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute Tests', () => {
   let commuteStore
   let commuteService

   beforeEach(() => {
      commuteService = new CommuteService()
      commuteStore = new CommuteStore(commuteService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   });
   it("it Should check the doNetWorkCallsForRequests",()=>{
       const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
        </Provider>
         </Router>
      )
      const myRequestsButton = getByRole('button', { name: 'My Requests' })

      fireEvent.click(myRequestsButton)
   })
});