import React from 'react'
import { observable, action } from 'mobx'

class MatchingRideRequestCard {
   @observable isAdded;
   @observable showMoreDetails;

   constructor(props) {
      this.origin=props.request.origin;
      this.destination=props.request.destination;
      this.flexible_with_time=props.request.flexible_with_time;
      this.no_of_seats=props.request.no_of_seats;
      this.luggage_quantity=props.request.luggage_quantity;
      this.requested_by=props.request.requested_by;
      this.ride_request_id=props.request.ride_request_id;
      if (props.request.flexible_with_time) {
         this.initIsFlexible(props)
      } else {
         this.initIsNotFlexible(props)
      }
      this.addButtonFunction = props.addButtonFunction
   }
   @action.bound
   initIsFlexible(props) {
      this.start_datetime=props.request.start_datetime;
      this.end_datetime=props.request.end_datetime;
   }
   @action.bound
   initIsNotFlexible(props) {
      this.datetime = props.request.datetime
   }
   @action.bound
   onClickAddButton() {
      this.postTheRequestId();
   }
   async postTheRequestId(){
      await this.addButtonFunction(this.ride_request_id);
      
   }
}
export { MatchingRideRequestCard }
// "origin": "string",
//       "destination": "string",
//       "datetime": "string",
//       "flexible_with_time": true,
//       "start_datetime": "string",
//       "end_datetime": "string",
//       "no_of_seats": 0,
//       "luggage_quantity": 0,
//       "accepted_person": {
//        "name": "string",
//        "mobile_number": "string"