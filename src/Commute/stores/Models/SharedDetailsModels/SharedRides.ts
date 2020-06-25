import React from 'react'
import { ShareRideRequestObject } from "../../types"
class SharedRides {
   origin:string;
   destination:string
   flexibleWithTime:boolean
   startDatetime!:string
   endDatetime!:string
   dateTime!:string
   noOfSeats:number
   assetsQuantity:number
   status:string
   constructor(rideDetails:ShareRideRequestObject) {
      this.origin = rideDetails.origin
      this.destination = rideDetails.destination

      this.flexibleWithTime = rideDetails.flexible_with_time

      this.noOfSeats = rideDetails.no_of_seats
      this.assetsQuantity = rideDetails.assets_quantity
      //this.status=rideDetails.status;
      this.status = 'None'
      if (rideDetails.flexible_with_time) {
         this.initIsFlexible(rideDetails)
      } else {
         this.initIsNotFlexible(rideDetails)
      }
   }
   initIsFlexible = props => {
      this.startDatetime = props.start_datetime
      this.endDatetime = props.end_datetime
   }

   initIsNotFlexible = props => {
      this.dateTime = props.datetime
   }
}
export { SharedRides }
