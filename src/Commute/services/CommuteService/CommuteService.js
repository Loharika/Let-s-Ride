import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import { endPoints } from '../endPoints'
import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json';
import sharedRides from '../../fixtures/sharedRide.fixture.json';
import travelInfo from '../../fixtures/sharedTravelInfo.fixture.json';

class CommuteService {
   baseApi
   constructor() {
      this.baseApi = create({
          baseURL:'https://e7371cdb684d.ngrok.io'
      })
   }
   @action
   rideRequestAPI(requestData) {
      console.log(requestData)
      return networkCallWithApisauce(
         this.baseApi,
         '/api/lets_ride/ride/request/v1/',
         requestData,
         apiMethods.post
      )
   }
   
   
   @action
   assetTransportRequestAPI(requestData) {
      return networkCallWithApisauce(
         this.baseApi,
         '/api/lets_ride/asset/transport/request/v1/', 
         requestData,
      apiMethods.post)
   }
   @action
   shareRideInfoAPI(details) {
      return networkCallWithApisauce(
         this.baseApi, 
         '/api/lets_ride/user/share/ride/v1/', 
         details, 
         apiMethods.post)
   }
   @action
   shareTravelInfoAPI(details) {
      return networkCallWithApisauce(
         this.baseApi,
         '/api/lets_ride/user/share/travel/info/v1/', 
         details,
         apiMethods.post)
   }
   @action
   myRideRequestsAPI(dataToGetRequests) {
      let offset=dataToGetRequests.offset;
      let limit=dataToGetRequests.limit;
      let sortBy=dataToGetRequests.sortBy; 
      let sort_by_field=dataToGetRequests.sortByField;
      let filterby=dataToGetRequests.filterBy;
      return networkCallWithApisauce(
         this.baseApi,
         `/api/lets_ride/user/requests/rides/v1/?offset=${offset}&limit=${limit}&sort_by_field=${sort_by_field}&sortby=${sortBy}&filterby=${filterby}`,
         {},
         apiMethods.get
      )
   }
   @action
   myAssetRequestsAPI(dataToGetRequests) {
      let offset=dataToGetRequests.offset;
      let limit=dataToGetRequests.limit;
      let sortBy=dataToGetRequests.sortBy; 
      let sort_by_field=dataToGetRequests.sortByField;
      let filterby=dataToGetRequests.filterBy;
      return networkCallWithApisauce(
         this.baseApi,
         `/api/lets_ride/user/requests/assets/v1/?offset=${offset}&limit=${limit}&sort_by_field=${sort_by_field}&sortby=${sortBy}&filterby=${filterby}`,
         {},
         apiMethods.get
      )
   }
   @action
   matchingAllRequestsAPI(requestType,dataToGetMatchingRequests) {
      
      let limit=dataToGetMatchingRequests.limit;
      let offset=dataToGetMatchingRequests.offset; 
      return networkCallWithApisauce(this.baseApi, 
      `/api/lets_ride/share/match/requests/v1/?offset=${offset}&limit=${limit}`, 
      {},
      apiMethods.get)
   }
   
   @action
   acceptTheMatchedRequestAPI(requestId) {
      return networkCallWithApisauce(this.baseApi, 
      '__', {}, 
      apiMethods.put)
   }
   
   @action 
   sharedRideAPI(details){
      let rides = {
         shared_rides: sharedRides.shared_rides.filter(
            (request, index) =>
               index >= details.offset &&
               index < details.offset + details.limit
         ),
         noOfRides: sharedRides.no_of_shared_rides
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(rides)
         }, 1000)
      })
   }
   @action
   travelInfoAPI(details){
      let travel_info = {
         travel_info: travelInfo.travel_info.filter(
            (request, index) =>
               index >= details.offset &&
               index < details.offset + details.limit
         ),
         noOfRides: travelInfo.no_of_travel_info
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(travel_info)
         }, 1000)
      })
   }
}
export { CommuteService }
