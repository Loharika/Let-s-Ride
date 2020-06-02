import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
/*const assetType={listTitle:'ASSET TYPE',
            listItems:[{
                        key: 'Parcel',
                        text: 'Parcel',
                        value: 'Parcel',
                      },
                      {
                        key: 'Bags',
                        text: 'Bags',
                        value: 'Bags',
                      },
                      {
                        key: 'Others',
                        text: 'Others',
                        value: 'Others',
                      },],
            placeholder:'Select Asset Type'
        };
        const assetSensitivity={listTitle:'ASSET SENSITIVITY',
            listItems:[{
                        key: 'Normal',
                        text: 'Normal',
                        value: 'Normal',
                      },
                      {
                        key: 'Sensitive',
                        text: 'Sensitive',
                        value: 'Sensitive',
                      },
                      {
                        key: 'Very Sensitive',
                        text: 'Very Sensitive',
                        value: 'Very Sensitive',
                      },],
            placeholder:'Select Asset Sensitivity',
        };
*/
class CommuteStore {
   @observable getAPIStatus
   @observable getAPIError
   @observable getAPIResponse

   @observable getMyRequestAPIStatus
   @observable getMyRequestAPIError
   @observable requests
   @observable noOfRequests

   @observable getMatchingRequestAPIStatus
   @observable getMatchingRequestAPIError
   @observable matchingRequests

   commuteService
   constructor(commuteService) {
      this.commuteService = commuteService
      this.init()
   }
   //<--------------------INITIALISING ALL THE VARISBLES------------------->
   @action.bound
   init() {
      this.initPostAPI()
      this.initMyRequestAPI()
      this.initMatchingRequestsAPI()
   }
   @action.bound
   initPostAPI() {
      this.getAPIStatus = API_INITIAL
      this.getAPIError = null
      this.getAPIResponse = ''
   }
   @action.bound
   initMyRequestAPI() {
      this.getMyRequestAPIStatus = API_INITIAL
      this.getMyRequestAPIError = null
      this.requests = []
      this.noOfRequests = 0
   }
   @action.bound
   initMatchingRequestsAPI() {
      this.getMatchingRequestAPIStatus = API_INITIAL
      this.getMatchingRequestAPIError = null
      this.matchingRequests = []
   }
   //<----------------------------------POST RIDE REQUEST,ASSET REQUEST DEATAILS-------------------->
   //<----------------------------------POST SHARE RIDE ,SHARE TRAVEL INFO DETAILS--------------------------------------->
   @action.bound
   postRideRequest(rideRequest) {
      this.initPostAPI()
      // calling init before going to post to clear API STATUS
      let rideRequestPromise = this.commuteService.rideRequestAPI(rideRequest)
      return bindPromiseWithOnSuccess(rideRequestPromise)
         .to(this.setGetAPIStatus, this.setGetAPIRResponse)
         .catch(this.setGetAPIError)
   }
   @action.bound
   postAssetTransportRequest(rideRequest) {
      this.initPostAPI()
      // calling init before going to post to clear API STATUS
      let assetRequestPromise = this.commuteService.assetTransportRequestAPI(
         rideRequest
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetAPIStatus, this.setGetAPIRResponse)
         .catch(this.setGetAPIError)
   }
   @action.bound
   shareRideInfo(details) {
      this.initPostAPI()

      let assetRequestPromise = this.commuteService.shareRideInfoAPI(details)
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetAPIStatus, this.setGetAPIRResponse)
         .catch(this.setGetAPIError)
   }
   @action.bound
   shareTravelInfo(details) {
      this.initPostAPI()
      let assetRequestPromise = this.commuteService.shareTravelInfoAPI(details)
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetAPIStatus, this.setGetAPIRResponse)
         .catch(this.setGetAPIError)
   }

   @action.bound
   setGetAPIStatus(apiStatus) {
      this.getAPIStatus = apiStatus
   }
   @action.bound
   setGetAPIError(apiError) {
      this.getAPIError = apiError
   }
   @action.bound
   setGetAPIRResponse(apiResponse) {
      this.getAPIResponse = apiResponse
      //console.log(apiResponse);
   }
   //<-------------------------------------GET REQUESTS----------------------------->
   @action.bound
   getMyRideRequests(dataToGetRequests) {
      this.initMyRequestAPI()
      let assetRequestPromise = this.commuteService.myRideRequestsAPI(
         dataToGetRequests
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetMyRequestAPIStatus, this.setGetMyRequestAPIResponse)
         .catch(this.setGetMyRequestAPIError)
   }
   @action.bound
   getMyAssetRequests(dataToGetRequests) {
      this.initMyRequestAPI()
      let assetRequestPromise = this.commuteService.myAssetRequestsAPI(
         dataToGetRequests
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetMyRequestAPIStatus, this.setGetMyRequestAPIResponse)
         .catch(this.setGetMyRequestAPIError)
   }

   @action.bound
   setGetMyRequestAPIStatus(apiStatus) {
      this.getMyRequestAPIStatus = apiStatus
   }
   @action.bound
   setGetMyRequestAPIError(apiError) {
      this.getMyRequestAPIError = apiError
   }
   @action.bound
   setGetMyRequestAPIResponse(apiResponse) {
      this.requests = apiResponse.requests
      this.noOfRequests = apiResponse.noOfRequests
   }
   //<---------------------------------GET MATCHING REQUESTS----------------------------->
   @action.bound
   getMatchingRideRequests(dataToGetMatchingRequests) {
      this.initMatchingRequestsAPI()
      let assetRequestPromise = this.commuteService.matchingRideRequestsAPI(
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
   getMatchingAssetRequests(dataToGetMatchingRequests) {
      this.initMatchingRequestsAPI()
      let assetRequestPromise = this.commuteService.matchingAssetRequestsAPI(
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
   getAllMatchingRequests(dataToGetMatchingRequests) {
      this.initMatchingRequestsAPI()
      let assetRequestPromise = this.commuteService.matchingAllRequestsAPI(
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
      this.matchingRequests = apiResponse
   }
}
export { CommuteStore }
