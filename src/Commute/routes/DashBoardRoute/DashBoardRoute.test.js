/*global expect*/
/*global jest*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'
import {COMMUTE_DASHBOARD_RIDE_REQUEST,
COMMUTE_DASHBOARD_HOME_PAGE,
COMMUTE_DASHBOARD_ASSET_REQUEST,
COMMUTE_DASHBOARD_SHARE_RIDE,
COMMUTE_DASHBOARD_SHARE_TRAVEL_INFO,
   COMMUTE_DASHBOARD_USERPROFILE
} from '../../constants/NavigationalConstants.js';
import {COMMUTE_DASHBOARD_LOGIN_PAGE} from '../../../Authentication/constants/NavigationalConstants.js';
import {
   API_INITIAL,
   API_SUCCESS,
   API_FAILED,
   API_FETCHING
} from '@ib/api-constants'
import DashBoardRoute from './DashBoardRoute.js'

import { CommuteService } from '../../services/CommuteService/CommuteService.fixture.js'
import { CommuteStore } from '../../stores/CommuteStore';

import authStore from '../../../Common/stores';
const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('DashBoardRoute Tests', () => {
   let commuteStore
   let commuteService

   beforeEach(() => {
      commuteService = new CommuteService()
      commuteStore = new CommuteStore(commuteService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   });
   it("it Should check the doNetWorkCallsForRequests for Ride Requests",()=>{
       const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
        </Provider>
         </Router>
      )
      const myRequestsButton = getByRole('button', { name: 'My Requests' })
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFunction=jest.fn();
      mockFunction.mockReturnValue(mockLoadingPromise)
      commuteStore.getMyRideRequests = mockFunction;
          
      fireEvent.click(myRequestsButton)
      
      expect(mockFunction).toBeCalled();
      
   });
   it("it Should check the doNetWorkCallsForRequests for Asset Requests",()=>{
      commuteStore.displayData.myRequests.requestType='ASSET'
       const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
        </Provider>
         </Router>
      )
      const myRequestsButton = getByRole('button', { name: 'My Requests' })
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFunction=jest.fn();
      mockFunction.mockReturnValue(mockLoadingPromise)
      commuteStore.getMyAssetRequests = mockFunction;
          
      fireEvent.click(myRequestsButton)
      
      expect(mockFunction).toBeCalled();
      
   });
   
   it("it Should check the doNetWorkCallsForMatchingResults",()=>{
       const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
        </Provider>
         </Router>
      )
      const matchingResultsButton = getByRole('button', { name: 'Matching Results' })
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFunction=jest.fn();
      mockFunction.mockReturnValue(mockLoadingPromise)
      commuteStore.getAllMatchingRequests = mockFunction
          
      fireEvent.click(matchingResultsButton)
      
      expect(mockFunction).toBeCalled();
   });
    it("it Should check the doNetWorkCallsForSharedDetails for Share Rides",()=>{
       const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
        </Provider>
         </Router>
      )
      const sharedResultsButton = getByRole('button', { name: 'Shared Details' })
      
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFunction=jest.fn();
      mockFunction.mockReturnValue(mockLoadingPromise)
      commuteStore.getSharedRides=mockFunction;
          
      fireEvent.click(sharedResultsButton)
     
      expect(mockFunction).toBeCalled();
     
   });
   it("it Should check the doNetWorkCallsForSharedDetails for Shared Travel Info",()=>{
      commuteStore.displayData.sharedDetails.shareType='TRAVEL INFO';
       const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
        </Provider>
         </Router>
      )
      const sharedResultsButton = getByRole('button', { name: 'Shared Details' })
      
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockFunction=jest.fn();
      mockFunction.mockReturnValue(mockLoadingPromise)
      commuteStore.getSharedTravelInfo=mockFunction;
          
      fireEvent.click(sharedResultsButton)
     
      expect(mockFunction).toBeCalled();
     
   });
   it("it should check the whether it is redirected to the ride Request Page expected page or not",()=>{
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_HOME_PAGE;
      history.push(route)
      const {  getByText, getByTestId } = render(
        
         func(commuteStore,history)
      )
      const requestsButton=getByText('Requests')
      fireEvent.click(requestsButton);
      const rideRequestButton=getByTestId('rideRequest')
      const assetRequestButton=getByTestId('assetTranportRequest')
      expect(rideRequestButton).toBeInTheDocument()
      expect(assetRequestButton).toBeInTheDocument()
      fireEvent.click(rideRequestButton);
      expect(history.location.pathname).toBe(COMMUTE_DASHBOARD_RIDE_REQUEST)
      
   })
   it("it should check the whether it is redirected to the asset Transport Request Page  page or not",()=>{
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_HOME_PAGE;
      history.push(route)
      const {  getByText, getByTestId } = render(
         func(commuteStore,history)
      )
      const requestsButton=getByText('Requests')
      fireEvent.click(requestsButton);
      const assetRequestButton=getByTestId('assetTranportRequest')
      expect(assetRequestButton).toBeInTheDocument()
      fireEvent.click(assetRequestButton);
      expect(history.location.pathname).toBe(COMMUTE_DASHBOARD_ASSET_REQUEST)
   })
   
   it("it should check the whether it is redirected to the share Travel Info Page  page or not",()=>{
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_HOME_PAGE;
      history.push(route)
      const {  getByText, getByTestId } = render(
         func(commuteStore,history)
      )
      const shareButton=getByText('Share')
      fireEvent.click(shareButton);
      const shareTravelInfoButton=getByTestId('share-travelInfo-button')
      expect(shareTravelInfoButton).toBeInTheDocument()
      fireEvent.click(shareTravelInfoButton);
      expect(history.location.pathname).toBe(COMMUTE_DASHBOARD_SHARE_TRAVEL_INFO)
   })
   it("it should check the whether it is redirected to the share Ride Page  page or not",()=>{
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_HOME_PAGE;
      history.push(route)
      const {  getByText, getByTestId } = render(
         func(commuteStore,history)
      )
      const shareButton=getByText('Share')
      fireEvent.click(shareButton);
      const shareRIdeButton=getByTestId('share-ride-button')
      expect(shareRIdeButton).toBeInTheDocument()
      fireEvent.click(shareRIdeButton);
      expect(history.location.pathname).toBe(COMMUTE_DASHBOARD_SHARE_RIDE)
   })
   it("it should check the whether it is redirected to the user Profile Page page or not",()=>{
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_HOME_PAGE;
      history.push(route)
      const {  getByText, getByTestId } = render(
         func(commuteStore,history)
      )
      const userProfileButton=getByTestId('user-profile')
      expect(userProfileButton).toBeInTheDocument()
      fireEvent.click(userProfileButton);
      expect(history.location.pathname).toBe(COMMUTE_DASHBOARD_USERPROFILE)
   });
   
   
   
    it("it should check the whether it is redirected to the Login  page or not",()=>{
      
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_HOME_PAGE;
      history.push(route);
      
      const {  getByText, getByTestId } = render(
         func(commuteStore,history)
      )
      const mockLoadingPromise=new Promise((resolve)=>{resolve("signOut")})
      const mockFunction=jest.fn();
      mockFunction.mockReturnValue(mockLoadingPromise);
      authStore.userSignOut=mockFunction;
      const userSignOutButton=getByTestId('signout-button')
      fireEvent.click(userSignOutButton);
      expect(authStore.userSignOut).toBeCalled()
      });
      
      
      it("it should check the addRequestButton ",()=>{
      
      const { getByText, getByTestId, getByRole } = render(
         <Router history={createMemoryHistory()}>
         <Provider commuteStore={commuteStore} authStore={authStore}>
            <DashBoardRoute  />
            </Provider>
         </Router>
      )
      
      const myRequestsButton = getByRole('button', { name: 'My Requests' });
      expect(myRequestsButton).toBeInTheDocument();
      fireEvent.click(myRequestsButton)
      //const addRequestButton=getByTestId('addButton');
      
      });
   
});

function func(commuteStore,history){
   return (
      <Provider authStore={authStore} commuteStore={commuteStore}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_HOME_PAGE}>
                  <DashBoardRoute />
               </Route>
            </Router>
         </Provider>
      );
}