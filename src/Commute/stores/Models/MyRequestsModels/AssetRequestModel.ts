
import { MyAssetRequestObject } from "../../types";

class AssetRequestModel{
    origin:string;
   destination:string
   flexibleWithTime:boolean
   startDatetime!:string
   endDatetime!:string
   dateTime!:string
   noOfSeats:number
   assetType:string
   assetSensitivity:string
   whomToDeliver:string
   status:string
   acceptedPersonDetails:{
      name:string
      mobile_number:string
   }
   constructor(assetRequest:MyAssetRequestObject){
    this.origin=assetRequest.origin
    this.destination=assetRequest.destination
    this.flexibleWithTime=assetRequest.flexible_with_time
    this.noOfSeats=assetRequest.no_of_seats
    this.assetType=assetRequest.asset_type
    this.assetSensitivity=assetRequest.asset_sensitivity
    this.whomToDeliver=assetRequest.whom_to_deliver
    this.status=assetRequest.status
    this.acceptedPersonDetails=assetRequest.accepted_person
    if (assetRequest.flexible_with_time) {
        this.initIsFlexible(assetRequest)
     } else {
        this.initIsNotFlexible(assetRequest)
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
export {AssetRequestModel}