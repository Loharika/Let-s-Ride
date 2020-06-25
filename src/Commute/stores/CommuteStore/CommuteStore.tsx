import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import {MatchedRideRequestObject, RideRequestObject, GetMyRideRequestResponse} from '../types'
import {RideRequestModel,AssetRequestModel} from '../../stores/Models/MyRequestsModels'
import {SharedRides, TravelInfo} from '../../stores/Models/SharedDetailsModels'
import {MatchingAssetRequestCard,MatchingRideRequestCard} from '../../stores/Models/MatchingRequestCard'
type DisplayData={
   matchingResults: {
      limit: number
      rideRequests:Array<object>,
      noOfRideRequests: number,
      assetRequests: Array<object>,
      noOfAssetRequests: number,
      requestType: string,
      filter: string,
      sortBy: string,
      rideRequestPageNumber: number,
      assetRequestPageNumber: number,
      sortByOrder:string
   },
   myRequests: {
      limit: number,
      rideRequests: Array<object>,
      noOfRideRequests: number,
      assetRequests: Array<object>,
      noOfAssetRequests: number,
      requestType: string,
      filter:string,
      sortBy: string,
      pageNumber: number,
      sortByField: string,
      rideRequestPageNumber: number,
      assetRequestPageNumber: number
   },
   sharedDetails: {
      limit: number,
      sharedRides: Array<object>,
      noOfSharedRides: number,
      travelInfo:  Array<object>,
      noOfSharedTravelInfo: number,
      shareType: string,
      filter: string,
      sortBy: string,
      pageNumber: number,
      sortByOrder:string,
      sharedRidePageNumber: number,
      sharedTravelInfoPageNumber: number
   }
}
type CommuteServiceType={
   rideRequestAPI:(rideRequest:object)=>Promise<object>
   assetTransportRequestAPI:(assetRequest:object)=>Promise<object>
   shareRideInfoAPI:(details:object)=>Promise<object>
   shareTravelInfoAPI:(details:object)=>Promise<object>
   myRideRequestsAPI:(dataToGetRequests:object)=>Promise<object>
   myAssetRequestsAPI:(dataToGetRequests:object)=>Promise<object>
   matchingAllRequestsAPI:(matchingRequestsFilter:string,
      dataToGetMatchingRequests:object)=>Promise<object>
   sharedRideAPI:(dataToGetSharedRides:object)=>Promise<object>
   travelInfoAPI:(dataToGetSharedTravelInfo:object)=>Promise<object>
   
}
class CommuteStore {
   @observable getRideRequestAPIStatus
   @observable getRideRequestAPIError
   @observable getRideRequestAPIResponse

   @observable getAssetTrasportRequestAPIStatus
   @observable getAssetTrasportRequestAPIError
   @observable getAssetTrasportRequestAPIResponse

   @observable getShareRideAPIStatus
   @observable getShareRideAPIError
   @observable getShareRideAPIResponse

   @observable getShareTravelInfoAPIStatus
   @observable getShareTravelInfoAPIError
   @observable getShareTravelInfoAPIResponse

   @observable getMyRideRequestAPIStatus
   @observable getMyRideRequestAPIError

   @observable getMyAssetRequestAPIStatus
   @observable getMyAssetRequestAPIError

   @observable getMatchingRequestAPIStatus
   @observable getMatchingRequestAPIError

   @observable getAcceptingMatchedRequestAPIStatus
   @observable getAcceptingMatchedRequestAPIError
   @observable getAcceptingMatchedRequestAPIResponse

   @observable getSharedRidesStatus
   @observable getSharedRidesError

   @observable getTravelInfoAPIStatus
   @observable getTravelInfoAPIError

   @observable displayData:DisplayData
   @observable selectedPage
   commuteService:CommuteServiceType
   limit:number
   constructor(commuteService:CommuteServiceType) {
      this.commuteService= commuteService
      this.init()
      this.limit = 4
      this.selectedPage = '/home/matched-requests'
      this.displayData = {
         matchingResults: {
            limit: 6,
            rideRequests: [],
            noOfRideRequests: 0,
            assetRequests: [],
            noOfAssetRequests: 0,
            requestType: 'RIDE', //ASSET
            filter: 'SELECT', //CONFIRMED PENDING EXPIRE
            sortBy: 'SELECT', //DATE TIME
            rideRequestPageNumber: 1,
            assetRequestPageNumber: 1,
            sortByOrder: 'ASC' //ASC DESC
         },
         myRequests: {
            limit: 6,
            rideRequests: [],
            noOfRideRequests: 0,
            assetRequests: [],
            noOfAssetRequests: 0,
            requestType: 'RIDE', //ASSET
            filter: 'PENDING', //CONFIRMED PENDING EXPIRE
            sortBy: 'DESC', //ASC DESC
            pageNumber: 1,
            sortByField: 'datetime', //datetime no_of_seats
            rideRequestPageNumber: 1,
            assetRequestPageNumber: 1
         },
         sharedDetails: {
            limit: 6,
            sharedRides: [],
            noOfSharedRides: 0,
            travelInfo: [],
            noOfSharedTravelInfo: 0,
            shareType: 'RIDE', //TRAVEL INFO
            filter: 'ACTIVE', //ACTIVE EXPIRED
            sortBy: 'ASC', //ASC DESC
            pageNumber: 1,
            sortByOrder: 'datetime', //datetime no_of_seats
            sharedRidePageNumber: 1,
            sharedTravelInfoPageNumber: 1
         }
      }
   }
   @action.bound
   onChangeSelectedPage(page) {
      this.selectedPage = page
   }
   @action.bound
   onChangeRequestType(selectorTabType, requestType) {
      this.displayData[selectorTabType].requestType = requestType
   }
   @action.bound
   onChangeFilter(selectorTabType, filterBy) {
      this.displayData[selectorTabType].filter = filterBy
   }
   @action.bound
   onChangeSortField(selectorTabType, sortByField) {
      this.displayData[selectorTabType].sortByField = sortByField
   }
   @action.bound
   onChangeSortBy(selectorTabType, sortBy) {
      this.displayData[selectorTabType].sortBy = sortBy
   }
   @action.bound
   onChangePageNumber(selectorTabType, pageNumber) {
      let requestType = this.displayData[selectorTabType].requestType
      switch (requestType) {
         case 'RIDE': {
            this.displayData[selectorTabType].rideRequestPageNumber = pageNumber
            break
         }
         case 'ASSET': {
            this.displayData[
               selectorTabType
            ].assetRequestPageNumber = pageNumber
            break
         }
      }
   }
   @action.bound
   onChangeSharedDetailsPageNumber(pageNumber) {
      let shareType = this.displayData['sharedDetails'].shareType
      switch (shareType) {
         case 'RIDE': {
            this.displayData['sharedDetails'].sharedRidePageNumber = pageNumber
            break
         }
         case 'TRAVEL INFO': {
            this.displayData[
               'sharedDetails'
            ].sharedTravelInfoPageNumber = pageNumber
            break
         }
      }
   }
   @action.bound
   onChangeSharedDetailsFilter(filterBy) {
      this.displayData['sharedDetails'].filter = filterBy
   }
   @action.bound
   onChangeSharedDetailsShareType(shareType) {
      this.displayData['sharedDetails'].shareType = shareType
   }

   //<--------------------INITIALISING ALL THE VARIABLES------------------->
   @action.bound
   init() {
      this.initRideRequestAPI()
      this.initAssetTransportRequestAPI()
      this.initShareRideAPI()
      this.initShareTravelInfoAPI()
      this.initMyRideRequestAPI()
      this.initMyAssetRequestAPI()
      this.initMatchingRequestsAPI()
      // this.initAcceptingMatchedRequestsAPI()
   }

   //<-----------------------------------INIATILISE REQUESTS API-------------------->

   @action.bound
   initRideRequestAPI() {
      this.getRideRequestAPIStatus = API_INITIAL
      this.getRideRequestAPIError = null
      this.getRideRequestAPIResponse = ''
   }

   @action.bound
   initAssetTransportRequestAPI() {
      this.getAssetTrasportRequestAPIStatus = API_INITIAL
      this.getAssetTrasportRequestAPIError = null
      this.getAssetTrasportRequestAPIResponse = ''
   }

   @action.bound
   initShareRideAPI() {
      this.getShareRideAPIStatus = API_INITIAL
      this.getShareRideAPIError = null
      this.getShareRideAPIResponse = ''
   }

   @action.bound
   initShareTravelInfoAPI() {
      this.getShareTravelInfoAPIStatus = API_INITIAL
      this.getShareTravelInfoAPIError = null
      this.getShareTravelInfoAPIResponse = ''
   }
   //<-----------------------------------INIATILISE MY REQUESTS API-------------------->

   @action.bound
   initMyRideRequestAPI() {
      this.getMyRideRequestAPIStatus = API_INITIAL
      this.getMyRideRequestAPIError = null
   }
   @action.bound
   initMyAssetRequestAPI() {
      this.getMyAssetRequestAPIStatus = API_INITIAL
      this.getMyAssetRequestAPIError = null
   }
   //<-----------------------------------INIATILISE MATCHING REQUESTS API-------------------->

   @action.bound
   initMatchingRequestsAPI() {
      this.getMatchingRequestAPIStatus = API_INITIAL
      this.getMatchingRequestAPIError = null
   }
   // //<-------------------------------------INIATILISE ACCEPTED MATCHED REQUEST API--------------------------->

   // @action.bound
   // initAcceptingMatchedRequestsAPI() {
   //    this.getAcceptingMatchedRequestAPIStatus = API_INITIAL
   //    this.getAcceptingMatchedRequestAPIError = null
   //    this.getAcceptingMatchedRequestAPIResponse = ''
   // }
   //<-------------------------------------INIATILISE SHARED DETAILS--------------------------->

   @action.bound
   initSharedRidesAPI() {
      this.getSharedRidesStatus = API_INITIAL
      this.getSharedRidesError = null
   }
   @action.bound
   initSharedTravelInfoAPI() {
      this.getTravelInfoAPIStatus = API_INITIAL
      this.getTravelInfoAPIError = null
   }

   //<----------------------------------POST RIDE REQUEST-------------------->
   @action.bound
   postRideRequest(rideRequest:RideRequestObject) {
      this.initRideRequestAPI()
      let rideRequestPromise = this.commuteService.rideRequestAPI(rideRequest)
      return bindPromiseWithOnSuccess(rideRequestPromise)
         .to(this.setGetRideRequestAPIStatus, this.setGetRideRequestAPIResponse)
         .catch(this.setGetRideRequestAPIError)
   }

   @action.bound
   setGetRideRequestAPIStatus(apiStatus) {
      this.getRideRequestAPIStatus = apiStatus
   }
   @action.bound
   setGetRideRequestAPIError(apiError) {
      this.getRideRequestAPIError = apiError
   }
   @action.bound
   setGetRideRequestAPIResponse(apiResponse) {
      this.getRideRequestAPIResponse = apiResponse
   }
   //<----------------------------------POST ASSET TRANSPORT REQUEST DEATAILS-------------------->
   @action.bound
   postAssetTransportRequest(assetRequest) {
      this.initAssetTransportRequestAPI()
      let assetRequestPromise = this.commuteService.assetTransportRequestAPI(
         assetRequest
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(
            this.setGetAssetTrasportRequestAPIStatus,
            this.setGetAssetTrasportRequestAPIResponse
         )
         .catch(this.setGetAssetTrasportRequestAPIError)
   }
   @action.bound
   setGetAssetTrasportRequestAPIStatus(apiStatus) {
      this.getAssetTrasportRequestAPIStatus = apiStatus
   }
   @action.bound
   setGetAssetTrasportRequestAPIError(apiError) {
      this.getAssetTrasportRequestAPIError = apiError
   }
   @action.bound
   setGetAssetTrasportRequestAPIResponse(apiResponse) {
      this.getAssetTrasportRequestAPIResponse = apiResponse
   }
   //<----------------------------------POST SHARE RIDE DETAILS--------------------------------------->
   @action.bound
   shareRideInfo(details) {
      this.initShareRideAPI()

      let assetRequestPromise = this.commuteService.shareRideInfoAPI(details)
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetShareRideAPIStatus, this.setGetShareRideAPIResponse)
         .catch(this.setGetShareRideAPIError)
   }
   @action.bound
   setGetShareRideAPIStatus(apiStatus) {
      this.getShareRideAPIStatus = apiStatus
   }
   @action.bound
   setGetShareRideAPIError(apiError) {
      this.getShareRideAPIError = apiError
   }
   @action.bound
   setGetShareRideAPIResponse(apiResponse) {
      this.getShareRideAPIResponse = apiResponse
   }

   //<----------------------------------POST SHARE TRAVEL INFO DETAILS--------------------------------------->

   @action.bound
   shareTravelInfo(details) {
      this.initShareTravelInfoAPI()
      let assetRequestPromise = this.commuteService.shareTravelInfoAPI(details)
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(
            this.setGetShareTravelInfoAPIStatus,
            this.setGetShareTravelInfoAPIResponse
         )
         .catch(this.setGetShareTravelInfoAPIError)
   }

   @action.bound
   setGetShareTravelInfoAPIStatus(apiStatus) {
      this.getShareTravelInfoAPIStatus = apiStatus
   }
   @action.bound
   setGetShareTravelInfoAPIError(apiError) {
      this.getShareTravelInfoAPIError = apiError
   }
   @action.bound
   setGetShareTravelInfoAPIResponse(apiResponse) {
      this.getShareTravelInfoAPIResponse = apiResponse
   }
   //<-------------------------------------GET MY RIDE REQUESTS ----------------------------------------------------->

   getMyRideRequests = dataToGetRequests => {
      this.initMyRideRequestAPI()
      let assetRequestPromise = this.commuteService.myRideRequestsAPI(
         dataToGetRequests
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(
            this.setGetMyRideRequestAPIStatus,
            this.setGetMyRideRequestAPIResponse
         )
         .catch(this.setGetMyRideRequestAPIError)
   }

   @action.bound
   setGetMyRideRequestAPIStatus(apiStatus) {
      this.getMyRideRequestAPIStatus = apiStatus
   }
   @action.bound
   setGetMyRideRequestAPIError(apiError) {
      this.getMyRideRequestAPIError = apiError
   }
   @action.bound
   setGetMyRideRequestAPIResponse(apiResponse) {
      this.displayData['myRequests'].rideRequests = apiResponse.ride_requests.map(request=>new RideRequestModel(request))
      this.displayData['myRequests'].noOfRideRequests =
         apiResponse.total_ride_requests_count
   }
   //<-------------------------------------GET MY ASSET REQUESTS ----------------------------------------------------->

   getMyAssetRequests = dataToGetRequests => {
      this.initMyAssetRequestAPI()
      let assetRequestPromise = this.commuteService.myAssetRequestsAPI(
         dataToGetRequests
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(
            this.setGetMyAssetRequestAPIStatus,
            this.setGetMyAssetRequestAPIResponse
         )
         .catch(this.setGetMyAssetRequestAPIError)
   }

   @action.bound
   setGetMyAssetRequestAPIStatus(apiStatus) {
      this.getMyAssetRequestAPIStatus = apiStatus
   }
   @action.bound
   setGetMyAssetRequestAPIError(apiError) {
      this.getMyAssetRequestAPIError = apiError
   }
   @action.bound
   setGetMyAssetRequestAPIResponse(apiResponse) {
      this.displayData['myRequests'].assetRequests = apiResponse.asset_requests.map(request=>new AssetRequestModel(request))

      this.displayData['myRequests'].noOfAssetRequests =
         apiResponse.total_asset_tansport_count
   }
   //<---------------------------------GET MATCHING REQUESTS----------------------------->

   getAllMatchingRequests = (
      matchingRequestsFilter,
      dataToGetMatchingRequests
   ) => {
      this.initMatchingRequestsAPI()
      let assetRequestPromise = this.commuteService.matchingAllRequestsAPI(
         matchingRequestsFilter,
         dataToGetMatchingRequests
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(
            this.setGetMatchingRequestAPIStatus,
            this.setGetMatchingRequestAPIResponse
         )
         .catch(this.setGetMatchingRequestAPIError)
   }

   @action.bound
   setGetMatchingRequestAPIStatus(apiStatus) {
      this.getMatchingRequestAPIStatus = apiStatus
   }
   @action.bound
   setGetMatchingRequestAPIError(apiError) {
      this.getMatchingRequestAPIError = apiError
   }
   @action.bound
   setGetMatchingRequestAPIResponse(apiResponse) {
      
      switch (this.displayData['matchingResults'].requestType) {
         case 'RIDE': {
            this.displayData['matchingResults'].rideRequests =
               apiResponse.ride_requests.map((request,index)=> { return new MatchingRideRequestCard(request,'service')})
               this.displayData['matchingResults'].noOfRideRequests =
               apiResponse.ride_requests_matches_count;
            break
         }
         case 'ASSET': {
            
            this.displayData['matchingResults'].assetRequests =
               apiResponse.asset_requests.map(request=>new MatchingAssetRequestCard(request,'service'))
            this.displayData['matchingResults'].noOfAssetRequests =
               apiResponse.assets_matches_count
            break
         }
      }
   }

   //<---------------------------------------------ACCEPTING MATCHING REQUEST---------------------------------------->

   // @action.bound
   // acceptTheMatchedRequest(requestId) {
   //    this.initAcceptingMatchedRequestsAPI()
   //    let matchedRequestPromise = this.commuteService.acceptTheMatchedRequestAPI(
   //       requestId
   //    )
   //    return bindPromiseWithOnSuccess(matchedRequestPromise)
   //       .to(
   //          this.setGetAcceptingMatchedRequestAPIStatus,
   //          this.setGetAcceptingMatchedRequestAPIResponse
   //       )
   //       .catch(this.setGetAcceptingMatchedRequestAPIError)
   // }
   // @action.bound
   // setGetAcceptingMatchedRequestAPIStatus(apiStatus) {
   //    this.getAcceptingMatchedRequestAPIStatus = apiStatus
   // }
   // @action.bound
   // setGetAcceptingMatchedRequestAPIError(apiError) {
   //    this.getAcceptingMatchedRequestAPIError = apiError
   // }
   // @action.bound
   // setGetAcceptingMatchedRequestAPIResponse(apiResponse) {
   //    this.getAcceptingMatchedRequestAPIResponse = apiResponse
   // }
   //<------------------------------------------------ GET SHARED RIDES--------------------------------------------------->

   getSharedRides = dataToGetSharedRides => {
      this.initSharedRidesAPI()
      let shareRidePromise = this.commuteService.sharedRideAPI(
         dataToGetSharedRides
      )
      return bindPromiseWithOnSuccess(shareRidePromise)
         .to(this.setGetSharedRidesStatus, this.setGetSharedRidesResponse)
         .catch(this.setGetSharedRidesError)
   }

   @action.bound
   setGetSharedRidesStatus(apiStatus) {
      this.getSharedRidesStatus = apiStatus
   }
   @action.bound
   setGetSharedRidesError(apiError) {
      this.getSharedRidesError = apiError
   }
   @action.bound
   setGetSharedRidesResponse(apiResponse) {
      this.displayData['sharedDetails'].sharedRides = apiResponse.shared_rides.map(shareRide=>new SharedRides(shareRide))
      this.displayData['sharedDetails'].noOfSharedRides =
         apiResponse.count_of_ride_shares
   }

   //<--------------------------------------------GET SHARE TRAVEL INFO---------------------------------------------->

   getSharedTravelInfo = dataToGetSharedTravelInfo => {
      this.initSharedTravelInfoAPI()
      let sharedTravelInfoPromise = this.commuteService.travelInfoAPI(
         dataToGetSharedTravelInfo
      )
      return bindPromiseWithOnSuccess(sharedTravelInfoPromise)
         .to(this.setGetTravelInfoAPIStatus, this.setGetTravelInfoAPIResponse)
         .catch(this.setGetTravelInfoAPIError)
   }

   @action.bound
   setGetTravelInfoAPIStatus(apiStatus) {
      this.getTravelInfoAPIStatus = apiStatus
   }
   @action.bound
   setGetTravelInfoAPIError(apiError) {
      this.getTravelInfoAPIError = apiError
   }
   @action.bound
   setGetTravelInfoAPIResponse(apiResponse) {
      this.displayData['sharedDetails'].travelInfo = apiResponse.shared_travels.map(travelInfo=>new TravelInfo(travelInfo))
      this.displayData['sharedDetails'].noOfSharedTravelInfo =
         apiResponse.total_travel_infos_shared
   }
}
export { CommuteStore }
