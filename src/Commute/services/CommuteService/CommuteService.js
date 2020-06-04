import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import { endPoints } from '../endPoints'

class CommuteService {
   baseApi
   constructor() {
      this.baseApi = create({
         baseURL: 'https://9ba0cd3ggi.execute-api.ap-south-1.amazonaws.com/'
      })
   }
   @action
   rideRequestAPI(requestData) {
      console.log(requestData)
      //rideRequest
      return networkCallWithApisauce(
         this.baseApi,
         'v1/rideRequest/',
         {},
         apiMethods.post
      )
   }
   @action
   assetTransportRequestAPI(requestData) {
      console.log(requestData)
      //assetTransportRequest

      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.post)
   }
   @action
   shareRideInfoAPI(details) {
      console.log(details)
      //shareRideInfo
      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.post)
   }
   @action
   shareTravelInfoAPI(details) {
      console.log(details)
      //shareTravelInfo
      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.post)
   }
   @action
   myRideRequestsAPI(dataToGetRequests) {
      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.get)
   }
   @action
   myAssetRequestsAPI(dataToGetRequests) {
      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.get)
   }

   @action
   matchingAllRequestsAPI(dataToGetMatchingRequests) {
      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.get)
   }
   @action
   acceptRideTransportRequest() {
      return networkCallWithApisauce(this.baseApi, '__', {}, apiMethods.put)
   }
}
export { CommuteService }
