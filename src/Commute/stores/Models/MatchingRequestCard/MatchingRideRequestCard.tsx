import React, { MouseEvent } from 'react'
import { observable, action } from 'mobx'
import 'react-toastify/dist/ReactToastify.css'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { toast } from 'react-toastify'
import { MatchedRideRequestObject } from "../../types"

toast.configure()
class MatchingRideRequestCard {
   id?:string
    origin:string
    destination:string
    flexibleWithTime:boolean
    noOfSeats:number
    luggageQuantity:number
    status?:string
    startDatetime!:string
    endDatetime!:string
    dateTime!:string
    requestedBy:{
       name:string,
       mobile_number:string
    }
    rideRequestId:string
   @observable isAdded:boolean
   @observable getAcceptingMatchedRequestAPIStatus!:APIStatus
   @observable getAcceptingMatchedRequestAPIError!:Error|null
   commuteService
   constructor(request:MatchedRideRequestObject,commuteService) {
      this.commuteService=commuteService;
      this.origin = request.origin
      this.destination = request.destination
      this.flexibleWithTime = request.flexible_with_time
      this.noOfSeats = request.no_of_seats
      this.luggageQuantity = request.luggage_quantity
      this.requestedBy = request.requested_by
      this.rideRequestId = request.ride_request_id
      this.isAdded = false
      this.status=request.status
      if (request.flexible_with_time) {
         this.initIsFlexible(request)
      } else {
         this.initIsNotFlexible(request)
      }

      this.initAcceptingMatchedRequestsAPI()
   }
   @action.bound
   initAcceptingMatchedRequestsAPI() {
      this.getAcceptingMatchedRequestAPIStatus = API_INITIAL
      this.getAcceptingMatchedRequestAPIError = null
   }
   @action.bound
   initIsFlexible(props) {
      this.startDatetime = props.start_datetime
      this.endDatetime= props.end_datetime
   }
   @action.bound
   initIsNotFlexible(props) {
      this.dateTime = props.datetime
   }
  
   displayToaster = (status) => {
   toast(<div className='text-black font-bold'>{status}</div>, {
         position: 'top-center',
         autoClose: 3000,
         closeButton: false,
         hideProgressBar: true
      })
   }
   @action.bound
   async postTheRequestId() {
      await this.acceptTheMatchedRequest(this.rideRequestId)
   }
   onClickAddButton=(event:MouseEvent<HTMLButtonElement>):void=> {
      this.postTheRequestId()
   }
   @action.bound
   acceptTheMatchedRequest(requestId) {
      this.initAcceptingMatchedRequestsAPI()
      let matchedRequestPromise = this.commuteService.acceptTheMatchedRequestAPI(requestId)
      return bindPromiseWithOnSuccess(matchedRequestPromise)
         .to(
            this.setGetAcceptingMatchedRequestAPIStatus,
            this.setGetAcceptingMatchedRequestAPIResponse
         )
         .catch(this.setGetAcceptingMatchedRequestAPIError)
   }

   @action.bound
   setGetAcceptingMatchedRequestAPIStatus(apiStatus) {
      this.getAcceptingMatchedRequestAPIStatus = apiStatus
      if (this.getAcceptingMatchedRequestAPIStatus === 200) {
         this.isAdded = true
         this.displayToaster('Successfully added the Request')
      }
      
   }
   @action.bound
   setGetAcceptingMatchedRequestAPIError(apiError) {
      this.getAcceptingMatchedRequestAPIError = apiError
   }
   @action.bound
   setGetAcceptingMatchedRequestAPIResponse(apiResponse) {
      // this.getAcceptingMatchedRequestAPIResponse = apiResponse
   }
}
export { MatchingRideRequestCard }
