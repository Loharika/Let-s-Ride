import { action } from 'mobx'
import { create } from 'apisauce'

import allRequestsData from '../../fixtures/allRequests.fixture.json'
import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json'
class CommuteService {
   baseApi;
   constructor() {
       this.baseApi = create({
          baseURL:'https://6b227f8028a0.ngrok.io'
      })
      
   }
   @action
   rideRequestAPI(requestData) {
      console.log(requestData)
      //rideRequest
      return new Promise(resolve => {
         resolve('rideRequest')
      })
   }
   @action
   assetTransportRequestAPI(requestData) {
      console.log(requestData)
      //assetTransportRequest
      return new Promise(resolve => {
         resolve('assetTransportRequest')
      })
   }
   @action
   shareRideInfoAPI(details) {
      console.log(details)
      return new Promise(resolve => {
         resolve('shareRide')
      })
   }
   @action
   shareTravelInfoAPI(details) {
      console.log(details)
      return new Promise(resolve => {
         resolve('shareTravelInfo')
      })
   }
   @action
   myRideRequestsAPI(dataToGetRequests) {
      console.log(dataToGetRequests);
      let requests = {
         requests: rideRequestData.requests.filter(
            (request, index) =>
               index >= dataToGetRequests.offset &&
               index < dataToGetRequests.offset + dataToGetRequests.limit
         ),
         noOfRequests: rideRequestData.noOfRequests
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(requests)
         }, 1000)
      })
      
   }
   @action
   myAssetRequestsAPI(dataToGetRequests) {
      let requests = {
         requests: assetRequestData.requests.filter(
            (request, index) =>
               index >= dataToGetRequests.offset &&
               index < dataToGetRequests.offset + dataToGetRequests.limit
         ),
         noOfRequests: assetRequestData.noOfRequests
      }
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(requests)
         }, 1000)
      })
      // let offset=dataToGetRequests.offset;
      // let limit=dataToGetRequests.limit;
      // let sort_by_field=dataToGetRequests.sortBy;
      // let sortBy=dataToGetRequests.sortByOrder;
      // let filterby=dataToGetRequests.filterBy;
      // return networkCallWithApisauce(
      //    this.baseApi,
      //    `/api/lets_ride/user/assets/rides/v1/?offset=${offset}&limit=${limit}&sort_by_field=${sort_by_field}&sortby=${sortBy}&filterby=${filterby}`,
      //    {},
      //    apiMethods.get
      // )
   }
   @action
   matchingAllRequestsAPI(matchingRequestsFilter,dataToGetRequests) {
      
      switch(matchingRequestsFilter){
         case 'RIDE':{
            let requests = {
                  requests: rideRequestData.requests.filter(
                  (request, index) =>
                  index >= dataToGetRequests.offset &&
                  index < dataToGetRequests.offset + dataToGetRequests.limit
                  ),
                  noOfRequests: rideRequestData.noOfRequests
               }
            
            return new Promise(resolve => {
         setTimeout(() => {
            resolve(requests)
               }, 1000)
            })
         }
         case 'ASSET':{
            let requests = {
                  requests: assetRequestData.requests.filter(
                  (request, index) =>
                  index >= dataToGetRequests.offset &&
                  index < dataToGetRequests.offset + dataToGetRequests.limit
                  ),
                  noOfRequests: assetRequestData.noOfRequests
               }
            return new Promise(resolve => {
         setTimeout(() => {
            resolve(requests)
         }, 1000)
      })
         }
      }
      
   }
}
export { CommuteService }
