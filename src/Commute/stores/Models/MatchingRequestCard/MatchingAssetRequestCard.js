import React from 'react'
import { observable, action } from 'mobx'

class MatchingAssetRequestCard {
   @observable isAdded
   @observable showMoreDetails

   constructor(props) {
      this.requestDetails = props.request
      this.id = props.request.id
      this.typeOfRequest = 'ASSET'
      this.name = props.request.name
      this.mobileNumber = props.request.mobileNumber
      this.from = props.request.from
      this.to = props.request.to
      this.mobileNumber = props.request.mobileNumber
      this.noOfSeats = props.request.noOfSeats
      this.assetType = props.request.assetType
      this.assetSentivity = props.request.assetSentivity
      this.acceptedPersonDetails = props.request.acceptedPersonDetails
      this.status = props.request.status

      this.isFlexible = props.request.hasOwnProperty('startTime')
      this.isAdded = false
      this.showMoreDetails = false

      if (this.isFlexible) {
         this.initIsFlexible(props)
      } else {
         this.initIsNotFlexible(props)
      }
      this.addButtonFunction = props.addButtonFunction
   }
   @action.bound
   initIsFlexible(props) {
      this.startTime = props.request.startTime
      this.endTime = props.request.endTime
   }
   @action.bound
   initIsNotFlexible(props) {
      this.date = props.request.date
   }
   @action.bound
   onClickAddButton() {
      this.isAdded = true
      this.addButtonFunction(this.name)
   }
   
}
export { MatchingAssetRequestCard }

// "id":"18",
//             "name":"Hello",
//             "from":"Harayan",
//             "to":"Kurnool",
//             "noOfSeats":6,
//             "mobileNumber":"23547687686",
//             "startTime":"Thu Apr 31 2017 21:46:04 GMT+0530 (India Standard Time)",
//             "endTime":"Thu Feb 31 2019 21:46:04 GMT+0530 (India Standard Time)",
//             "assetType":"gadgets",
//             "assetSentivity":"very sensitive",
//             "acceptedPersonDetails":"raani-1234560987",
//             "status":"Expire"
