import React from 'react'
import { observable, action } from 'mobx'

class MatchingRideRequestCard {
   @observable isAdded;
   @observable showMoreDetails;

   constructor(props) {
      this.requestDetails = props.request
      this.id = props.request.id
      this.typeOfRequest = 'RIDE'
      this.name = props.request.name
      this.mobileNumber = props.request.mobileNumber
      this.from = props.request.from
      this.to = props.request.to
      this.noOfSeats = props.request.noOfSeats
      this.noOfLuggages = props.request.noOfLuggages
      this.acceptedPersonDetails=props.request.acceptedPersonDetails;
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
export { MatchingRideRequestCard }

// "id":"10",
//             "name":"Dr. Madelynn Lehner",
//             "from":"Hyderabad",
//             "to":"Kurnool",
//             "noOfSeats":6,
//             "mobileNumber":"9628354224",
//             "startTime":"Thu Jan 04 2019 10:36:04 GMT+0530 (India Standard Time)",
//             "endTime":"Sat Jan 04 2019 23:36:04 GMT+0530 (India Standard Time)",
//             "noOfLuggages":3,
//             "acceptedPersonDetails":"kavya-1234567890",
//             "status":"Expire"
