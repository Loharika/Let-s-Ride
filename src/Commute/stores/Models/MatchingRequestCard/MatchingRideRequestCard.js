import React from 'react'
import { observable, action } from 'mobx'
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';

toast.configure();


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
      this.isAdded=false;
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
   displayToaster=()=> {
      toast(<div className='text-black font-bold'>Accepted</div>, {
            position: toast.POSITION.TOP_CENTER,
            autoClose:3000,
            closeButton: false,
            hideProgressBar: true,
            
      });
    }
   async postTheRequestId(){
      
      await this.addButtonFunction(this.ride_request_id);
     this.displayToaster();
   }
}
export { MatchingRideRequestCard }