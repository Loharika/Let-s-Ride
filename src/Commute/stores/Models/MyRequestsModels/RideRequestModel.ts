import React from 'react';
import { MyRideRequestObject } from "../../types";
class RideRequestModel {
    id:string
    origin:string
    destination:string
    flexibleWithTime:boolean
    noOfSeats:number
    luggageQuantity:number
    status:string
    startDatetime!:string
    endDatetime!:string
    dateTime!:string
    acceptedPersonDetails:{
        name:string,
        mobile_number:string
    }
   constructor(rideDetails:MyRideRequestObject) {
        this.id=Math.random().toString()
      this.origin = rideDetails.origin
      this.destination = rideDetails.destination

      this.flexibleWithTime = rideDetails.flexible_with_time

      this.noOfSeats = rideDetails.no_of_seats
      this.luggageQuantity = rideDetails.luggage_quantity
      this.status=rideDetails.status;
      if (rideDetails.flexible_with_time) {
         this.initIsFlexible(rideDetails)
      } else {
         this.initIsNotFlexible(rideDetails)
      }
      this.acceptedPersonDetails=rideDetails.accepted_person
   }
   initIsFlexible = props => {
      this.startDatetime = props.start_datetime
      this.endDatetime = props.end_datetime
   }

   initIsNotFlexible = props => {
      this.dateTime = props.datetime
   }
}
export { RideRequestModel }
