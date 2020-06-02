import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../constants/APIConstants'

import { endPoints } from '../endPoints'

class CommuteService {
   rideRequestApi
   assetTransportRequestApi
   shareRideInfoApi
   shareTravelInfoApi
   myRideRequestsApi
   myAssetRequestsApi
   matchingRideRequestsApi
   matchingAssetRequestsApi
   matchingAllRequestsApi
   constructor() {
      this.rideRequestApi = create({
         baseURL: 'https://9ba0cd3ggi.execute-api.ap-south-1.amazonaws.com/'
      })
      this.assetTransportRequestApi = create({
         baseURL: '__'
      })
      this.myRideRequestsApi = create({
         baseURL: '__'
      })
      this.myAssetRequestsApi = create({
         baseURL: '__'
      })
      this.shareRideInfoApi = create({
         baseURL: '__'
      })
      this.shareTravelInfoApi = create({
         baseURL: '__'
      })
      this.matchingRideRequestsApi = create({
         baseURL: '__'
      })
      this.matchingAssetRequestsApi = create({
         baseURL: '__'
      })
      this.matchingAllRequestsApi = create({
         baseURL: '__'
      })
   }
   @action
   rideRequestAPI(requestData) {
      console.log(requestData)
      //rideRequest
      return networkCallWithApisauce(
         this.rideRequestApi,
         'v1/rideRequest/',
         {},
         apiMethods.post
      )
   }
   @action.bound
   assetTransportRequestAPI(requestData) {
      console.log(requestData)
      //assetTransportRequest

      return networkCallWithApisauce(
         this.assetTransportRequestApi,
         '__',
         {},
         apiMethods.post
      )
   }
   @action.bound
   shareRideInfoAPI(details) {
      console.log(details)
      //shareRideInfo
      return networkCallWithApisauce(
         this.shareRideInfoApi,
         '__',
         {},
         apiMethods.post
      )
   }
   @action.bound
   shareTravelInfoAPI(details) {
      console.log(details)
      //shareTravelInfo
      return networkCallWithApisauce(
         this.shareTravelInfoApi,
         '__',
         {},
         apiMethods.post
      )
   }
   @action.bound
   myRideRequests(dataToGetRequests) {
      return networkCallWithApisauce(
         this.myRideRequestsApi,
         '__',
         {},
         apiMethods.get
      )
   }
   @action.bound
   myAssetRequests(dataToGetRequests) {
      return networkCallWithApisauce(
         this.myAssetRequestsApi,
         '__',
         {},
         apiMethods.get
      )
   }
   @action.bound
   matchingRideRequestsAPI(dataToGetMatchingRequests) {
      return networkCallWithApisauce(
         this.matchingRideRequestsApi,
         '__',
         {},
         apiMethods.get
      )
   }
   @action.bound
   matchingAssetRequestsAPI(dataToGetMatchingRequests) {
      return networkCallWithApisauce(
         this.matchingAssetRequestsApi,
         '__',
         {},
         apiMethods.get
      )
   }
   @action.bound
   matchingAllRequestsAPI(dataToGetMatchingRequests) {
      return networkCallWithApisauce(
         this.matchingAllRequestsApi,
         '__',
         {},
         apiMethods.get
      )
   }
}
export { CommuteService }
