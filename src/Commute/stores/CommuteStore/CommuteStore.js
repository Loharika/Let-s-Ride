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
   @observable rideRequests
   @observable noOfRideRequests
   
   @observable getMyAssetRequestAPIStatus
   @observable getMyAssetRequestAPIError
   @observable assetRequests
   @observable noOfassetRequests

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
      this.initRideRequestAPI();
      this.initAssetTransportRequestAPI();
      this.initShareRideAPI();
      this.initShareTravelInfoAPI();
      this.initMyRideRequestAPI();
      this.initMyAssetRequestAPI();
      this.initMatchingRequestsAPI()
   }
   //<-----------------------------------INIATILISE REQUESTS API-------------------->
   
   @action.bound
   initRideRequestAPI(){
      this.getRideRequestAPIStatus=API_INITIAL;
      this.getRideRequestAPIError=null;
      this.getRideRequestAPIResponse='';
   }
   
   @action.bound
   initAssetTransportRequestAPI(){
      this.getAssetTrasportRequestAPIStatus = API_INITIAL
      this.getAssetTrasportRequestAPIError = null
      this.getAssetTrasportRequestAPIResponse = ''
   }
   
   @action.bound
   initShareRideAPI(){
      this.getShareRideAPIStatus = API_INITIAL
      this.getShareRideAPIError = null
      this.getShareRideAPIResponse = ''
   }
   
   @action.bound
   initShareTravelInfoAPI(){
      this.getShareTravelInfoAPIStatus = API_INITIAL
      this.getShareTravelInfoAPIError = null
      this.getShareTravelInfoAPIResponse = ''
   }
   //<-----------------------------------INIATILISE MY REQUESTS API-------------------->
   
   @action.bound
   initMyRideRequestAPI(){
      this.getMyRideRequestAPIStatus = API_INITIAL
      this.getMyRideRequestAPIError = null
      this.rideRequests = []
      this.noOfRideRequests = 0
   }
   @action.bound
   initMyAssetRequestAPI(){
      this.getMyAssetRequestAPIStatus = API_INITIAL
      this.getMyAssetRequestAPIError = null
      this.assetRequests = []
      this.noOfAssetRequests = 0
   }
   //<-----------------------------------INIATILISE MATCHING REQUESTS API-------------------->
   
   @action.bound
   initMatchingRequestsAPI() {
      this.getMatchingRequestAPIStatus = API_INITIAL
      this.getMatchingRequestAPIError = null
      this.matchingRequests = []
   }
   //<----------------------------------POST RIDE REQUEST-------------------->
   @action.bound
   postRideRequest(rideRequest) {
      this.initRideRequestAPI()
      let rideRequestPromise = this.commuteService.rideRequestAPI(rideRequest)
      return bindPromiseWithOnSuccess(rideRequestPromise)
         .to(this.setGetRideRequestAPIStatus, this.setGetRideRequestAPIResponse)
         .catch(this.setGetRideRequestAPIError)
   }

   @action.bound
   setGetRideRequestAPIStatus(apiStatus) {
      this.getRideRequestAPIStatus = apiStatus;
   }
   @action.bound
   setGetRideRequestAPIError(apiError) {
      this.getRideRequestAPIError = apiError;
   }
   @action.bound
   setGetRideRequestAPIResponse(apiResponse) {
      this.getRideRequestAPIResponse = apiResponse;
   }
   //<----------------------------------POST ASSET TRANSPORT REQUEST DEATAILS-------------------->
   @action.bound
   postAssetTransportRequest(rideRequest) {
      this.initAssetTransportRequestAPI()
      let assetRequestPromise = this.commuteService.assetTransportRequestAPI(rideRequest)
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetAssetTrasportRequestAPIStatus, this.setGetAssetTrasportRequestAPIResponse)
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
         .to(this.setGetShareTravelInfoAPIStatus, this.setGetShareTravelInfoAPIResponse)
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
   @action.bound
   getMyRideRequests(dataToGetRequests) {
      this.initMyRideRequestAPI()
      let assetRequestPromise = this.commuteService.myRideRequestsAPI(dataToGetRequests)
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetMyRideRequestAPIStatus, this.setGetMyRideRequestAPIResponse)
         .catch(this.setGetMyRideRequestAPIError)
   }
   
   @action.bound
   setGetMyRideRequestAPIStatus(apiStatus) {
      this.getMyRideRequestAPIStatus = apiStatus;
   }
   @action.bound
   setGetMyRideRequestAPIError(apiError) {
      this.getMyRideRequestAPIError = apiError;
   }
   @action.bound
   setGetMyRideRequestAPIResponse(apiResponse) {
      this.rideRequests = apiResponse.requests;
      this.noOfRideRequests = apiResponse.noOfRequests;
   }
   //<-------------------------------------GET MY ASSET REQUESTS ----------------------------------------------------->
   
   @action.bound
   getMyAssetRequests(dataToGetRequests) {
      this.initMyAssetRequestAPI()
      let assetRequestPromise = this.commuteService.myAssetRequestsAPI(
         dataToGetRequests
      )
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(this.setGetMyAssetRequestAPIStatus, this.setGetMyAssetRequestAPIResponse)
         .catch(this.setGetMyAssetRequestAPIError)
   }

   @action.bound
   setGetMyAssetRequestAPIStatus(apiStatus) {
      this.getMyAssetRequestAPIStatus = apiStatus;
   }
   @action.bound
   setGetMyAssetRequestAPIError(apiError) {
      this.getMyAssetRequestAPIError = apiError;
   }
   @action.bound
   setGetMyAssetRequestAPIResponse(apiResponse) {
      this.assetRequests = apiResponse.requests;
      this.noOfAssetRequests = apiResponse.noOfRequests;
   }
   //<---------------------------------GET MATCHING REQUESTS----------------------------->
   @action.bound
   getAllMatchingRequests(dataToGetMatchingRequests) {
      this.initMatchingRequestsAPI()
      let assetRequestPromise = this.commuteService.matchingAllRequestsAPI(
         dataToGetMatchingRequests
      );
      return bindPromiseWithOnSuccess(assetRequestPromise)
         .to(
            this.setGetMatchingRequestAPIStatus,
            this.setGetMatchingRequestAPIResponse
         )
         .catch(this.setGetMatchingRequestAPIError);
   }

   @action.bound
   setGetMatchingRequestAPIStatus(apiStatus) {
      this.getMatchingRequestAPIStatus = apiStatus;
   }
   @action.bound
   setGetMatchingRequestAPIError(apiError) {
      this.getMatchingRequestAPIError = apiError;
   }
   @action.bound
   setGetMatchingRequestAPIResponse(apiResponse) {
      this.matchingRequests = apiResponse;
   }
}
export { CommuteStore }
