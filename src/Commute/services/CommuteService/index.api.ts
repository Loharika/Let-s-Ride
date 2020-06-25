import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import {endPoints} from '../endPoints';
import CommuteServiceInterface from '.'
import { RideRequestObject, AssetRequestObject, ShareRideRequestObject, ShareTravelInfoRequestObject, MyRequestObject, MatchingRequestsRequestObject, SharedDetailsRequestObject } from "../../stores/types";
class CommuteService implements CommuteServiceInterface{
   baseApi:Record<string, any>
   constructor() {
      this.baseApi = create({
         baseURL: 'https://1d2c1582fff8.ngrok.io'
      })
   }
   @action
   rideRequestAPI(requestData:RideRequestObject) {
      return networkCallWithApisauce(
         this.baseApi,
         endPoints.rideRequestApi,
         requestData,
         apiMethods.post
      )
   }

   @action
   assetTransportRequestAPI(requestData:AssetRequestObject) {
      return networkCallWithApisauce(
         this.baseApi,
         endPoints.assetTransportRequestApi,
         requestData,
         apiMethods.post
      )
   }
   @action
   shareRideInfoAPI(details:ShareRideRequestObject) {
      return networkCallWithApisauce(
         this.baseApi,
         endPoints.shareRideInfoApi,
         details,
         apiMethods.post
      )
   }
   @action
   shareTravelInfoAPI(details:ShareTravelInfoRequestObject) {
      return networkCallWithApisauce(
         this.baseApi,
         endPoints.shareTravelInfoApi,
         details,
         apiMethods.post
      )
   }
   @action
   myRideRequestsAPI(dataToGetRequests:MyRequestObject) {
      let offset = dataToGetRequests.offset
      let limit = dataToGetRequests.limit
      let sortBy = dataToGetRequests.sortBy
      let sort_by_field = dataToGetRequests.sortByField
      let filterby = dataToGetRequests.filterBy
      return networkCallWithApisauce(
         this.baseApi,
         `${endPoints.myRideRequestsApi}?offset=${offset}&limit=${limit}&sort_by_field=${sort_by_field}&sortby=${sortBy}&filterby=${filterby}`,
         {},
         apiMethods.get
      )
   }
   @action
   myAssetRequestsAPI(dataToGetRequests:MyRequestObject) {
      let offset = dataToGetRequests.offset
      let limit = dataToGetRequests.limit
      let sortBy = dataToGetRequests.sortBy
      let sort_by_field = dataToGetRequests.sortByField
      let filterby = dataToGetRequests.filterBy
      return networkCallWithApisauce(
         this.baseApi,
         `${endPoints.myAssetRequestsApi}?offset=${offset}&limit=${limit}&sort_by_field=${sort_by_field}&sortby=${sortBy}&filterby=${filterby}`,
         {},
         apiMethods.get
      )
   }
   @action
   matchingAllRequestsAPI(requestType:string, dataToGetMatchingRequests:MatchingRequestsRequestObject) {
      let limit = dataToGetMatchingRequests.limit
      let offset = dataToGetMatchingRequests.offset
      return networkCallWithApisauce(
         this.baseApi,
         `${endPoints.matchingAllRequestsApi}?offset=${offset}&limit=${limit}`,
         {},
         apiMethods.get
      )
   }

   @action
   acceptTheMatchedRequestAPI(requestId:string) {
      return networkCallWithApisauce(
         this.baseApi,
        endPoints.acceptTheMatchedRequestApi,
         {
            share_type: 'ride',
            share_id: 2
         },
         apiMethods.put
      )
   }

   @action
   sharedRideAPI(details:SharedDetailsRequestObject) {
      return networkCallWithApisauce(
         this.baseApi,
         endPoints.sharedRideApi,
         {},
         apiMethods.get
      )
   }
   @action
   travelInfoAPI(details:SharedDetailsRequestObject) { 
      return networkCallWithApisauce(
         this.baseApi,
         endPoints.travelInfoApi,
         {},
         apiMethods.get
      )
   }
}
export { CommuteService }
