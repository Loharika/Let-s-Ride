import React from 'react'
import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'
import { MatchedAssetRequestObject } from '../../types'
toast.configure()

class MatchingAssetRequestCard {
   origin: string
   destination: string
   noOfAssets: number
   assetType: string
   startDatetime!: string
   endDatetime!: string
   datetime!: string
   assetSensitivity: string
   luggageQuantity: number
   assetToBeDeliveredTo: string
   requestedBy: {
      name: string
      mobile_number: string
   }
   assetRequestId: string
   flexibleWithTime: boolean
   whomToDeliver: string
   @observable getAcceptingMatchedRequestAPIStatus
   @observable getAcceptingMatchedRequestAPIError
   @observable isAdded: boolean
   @observable isHover!: boolean
   commuteService
   constructor(request: MatchedAssetRequestObject, commuteService) {
      this.commuteService = commuteService
      this.origin = request.origin
      this.destination = request.destination
      this.noOfAssets = request.assets_quantity
      this.assetType = request.asset_type
      this.assetSensitivity = request.asset_sensitivity
      this.luggageQuantity = request.luggage_quantity
      this.assetToBeDeliveredTo = request.whom_to_deliver
      this.requestedBy = request.requested_by
      this.assetRequestId = request.asset_request_id
      this.flexibleWithTime = request.flexible_with_time
      this.whomToDeliver = request.whom_to_deliver
      this.isAdded = false
      this.isHover = false
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
   initIsFlexible(request) {
      this.startDatetime = request.start_datetime
      this.endDatetime = request.end_datetime
   }
   @action.bound
   initIsNotFlexible(request) {
      this.datetime = request.datetime
   }
   displayToaster(status) {
      toast(<div className='text-black font-bold'>{status}</div>, {
         position: 'top-center',
         autoClose: 3000,
         closeButton: false,
         hideProgressBar: true
      })
   }

   async postTheRequestId() {
      await this.acceptTheMatchedRequest(this.assetRequestId)
   }
   onClickAddButton = (): void => {
      this.postTheRequestId()
   }
   @action.bound
   acceptTheMatchedRequest(requestId) {
      this.initAcceptingMatchedRequestsAPI()
      let matchedRequestPromise = this.commuteService.acceptTheMatchedRequestAPI(
         requestId
      )
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
   @action.bound
   onMouseEnterOnRequest() {
      this.isHover = true
   }
   @action.bound
   onMouseLeaveOnRequest() {
      this.isHover = false
   }
}
export { MatchingAssetRequestCard }
