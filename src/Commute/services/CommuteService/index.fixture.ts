import { action } from 'mobx'
import { create } from 'apisauce'

import { RideRequestObject, AssetRequestObject, ShareRideRequestObject, ShareTravelInfoRequestObject, MyRequestObject, MatchingRequestsRequestObject, SharedDetailsRequestObject ,
} from "../../stores/types";

import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json'
import matchedRideRequests from '../../fixtures/matchedRideRequests.fixture.json'
import matchingAssetsRequests from '../../fixtures/matchedAssetRequests.fixture.json'
import sharedRides from '../../fixtures/sharedRide.fixture.json'
import travelInfo from '../../fixtures/sharedTravelInfo.fixture.json'
import CommuteServiceInterface from "."
import { resolveWithTimeout } from '../../../Common/utils/TestUtils'
class CommuteService  implements CommuteServiceInterface{
   baseApi:Record<string, any>
   constructor() {
      this.baseApi = create({
         baseURL: 'https://6b227f8028a0.ngrok.io'
      })
   }
   @action
   rideRequestAPI(requestData) {
      return resolveWithTimeout({})
   }
   @action
   assetTransportRequestAPI(requestData) {
      return resolveWithTimeout({})
   }
   @action
   shareRideInfoAPI(details) {
      return resolveWithTimeout({})
   }
   @action
   shareTravelInfoAPI(details) {
      return resolveWithTimeout({})
   }
   @action
   myRideRequestsAPI(dataToGetRequests) {
      let requests = {
         ride_requests: rideRequestData.ride_requests.filter(
            (request, index) =>
               index >= dataToGetRequests.offset &&
               index < dataToGetRequests.offset + dataToGetRequests.limit
         ),
         total_ride_requests_count: rideRequestData.total_ride_requests_count
      }
      return resolveWithTimeout(requests)
         
   }
   @action
   myAssetRequestsAPI(dataToGetRequests) {
      let requests = {
         asset_requests: assetRequestData.asset_requests.filter(
            (request, index) =>
               index >= dataToGetRequests.offset &&
               index < dataToGetRequests.offset + dataToGetRequests.limit
         ),
         total_asset_tansport_count: assetRequestData.total_asset_tansport_count
      }
      return resolveWithTimeout(requests)
   }
   @action
   matchingAllRequestsAPI(matchingRequestsFilter, dataToGetRequests) {
            let requests = {
               ride_requests: matchedRideRequests.ride_requests.filter(
                  (request, index) =>
                     index >= dataToGetRequests.offset &&
                     index < dataToGetRequests.offset + dataToGetRequests.limit
               ),
               ride_requests_matches_count:
                  matchedRideRequests.total_ride_requests_count,
               asset_requests: matchingAssetsRequests.asset_requests.filter(
                     (request, index) =>
                        index >= dataToGetRequests.offset &&
                        index < dataToGetRequests.offset + dataToGetRequests.limit
                  ),
               assets_matches_count: assetRequestData.total_asset_tansport_count
            }

            return resolveWithTimeout(requests)
         }
   @action
   acceptTheMatchedRequestAPI(requestId) {
      return resolveWithTimeout({})
   }
   @action
   sharedRideAPI(details) {
      let rides = {
         shared_rides: sharedRides.ride_shares.filter(
            (request, index) =>
               index >= details.offset && index < details.offset + details.limit
         ),
         count_of_ride_shares: sharedRides.count_of_ride_shares
      }

      return resolveWithTimeout(rides)
   }
   @action
   travelInfoAPI(details) {
      let travel_info = {
         shared_travels: travelInfo.travel_info.filter(
            (request, index) =>
               index >= details.offset && index < details.offset + details.limit
         ),
         total_travel_infos_shared: travelInfo.no_of_travel_info
      }
      return resolveWithTimeout(travel_info)
   }
}
export { CommuteService }
