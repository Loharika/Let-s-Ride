import { action } from 'mobx'
import { create } from 'apisauce'

import allRequestsData from '../../fixtures/allRequests.fixture.json'
import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json'
class CommuteService {
   constructor() {}
   @action
   rideRequestAPI(requestData) {
      console.log(requestData)
      //rideRequest
      return new Promise(resolve => {
         resolve('rideRequest')
      })
   }
   @action.bound
   assetTransportRequestAPI(requestData) {
      console.log(requestData)
      //assetTransportRequest
      return new Promise(resolve => {
         resolve('assetTransportRequest')
      })
   }
   @action.bound
   shareRideInfoAPI(details) {
      console.log(details)
      return new Promise(resolve => {
         resolve('shareRide')
      })
   }
   @action.bound
   shareTravelInfoAPI(details) {
      console.log(details)
      return new Promise(resolve => {
         resolve('shareTravelInfo')
      })
   }
   @action.bound
   myRideRequestsAPI(dataToGetRequests) {
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
   @action.bound
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
   }
   @action.bound
   matchingRideRequestsAPI(dataToGetMatchingRequests) {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(allRequestsData.rideRequests)
         }, 1000)
      })
   }
   @action.bound
   matchingAssetRequestsAPI(dataToGetMatchingRequests) {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(allRequestsData.assetRequests)
         }, 1000)
      })
   }
   @action.bound
   matchingAllRequestsAPI(dataToGetMatchingRequests) {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve(
               allRequestsData.assetRequests.concat(
                  allRequestsData.rideRequests
               )
            )
         }, 1000)
      })
   }
}
export { CommuteService }
