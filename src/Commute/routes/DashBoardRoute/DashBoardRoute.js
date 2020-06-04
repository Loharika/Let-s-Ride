import React from 'react'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { DashBoard } from '../../components/CommuteDashboard'

import {withHeader} from '../../Hocs/withHeader';

@inject('commuteStore')
@observer
class DashBoardRoute extends React.Component {
   componentDidMount() {
      const {
         doNetWorkCallsForMatchingRequests
      } = this
      doNetWorkCallsForMatchingRequests();
   }
   @action.bound
   async doNetWorkCallsForRequests(){
      const {commuteStore:{displayData,limit,getMyRideRequests,getMyAssetRequests}}=this.props;
      const requestType=displayData.myRequests.requestType;
      
      switch(requestType){
         case 'RIDE':{
            const filter=displayData.myRequests.filter;
            const pageNumber=displayData.myRequests.rideRequestPageNumber;
            const sortBy=displayData.myRequests.sortBy;
            const sortByOrder=displayData.myRequests.sortBy;
            let offset = (pageNumber - 1) * limit;
            const dataToGetRequests = {
               filterBy: filter,
               sortBy: sortBy,
               sortByOrder:sortByOrder,
               offset: offset,
               limit: limit,
            };
            await getMyRideRequests(dataToGetRequests);
         }
         case 'ASSET':{
            const filter=displayData.myRequests.filter;
            const pageNumber=displayData.myRequests.assetRequestPageNumber;
            const sortBy=displayData.myRequests.sortBy;
            const sortByOrder=displayData.myRequests.sortBy;
            let offset = (pageNumber - 1) * limit;
            const dataToGetRequests = {
               filterBy: filter,
               sortBy: sortBy,
               sortByOrder:sortByOrder,
               offset: offset,
               limit: limit,
            };
            await getMyAssetRequests(dataToGetRequests);
         }
      }
   }
   @action.bound
   async doNetWorkCallsForMatchingRequests() {
      const {commuteStore:{displayData,limit,getAllMatchingRequests}}=this.props;
      const requestType=displayData.matchingResults.requestType;
      const filter=displayData.matchingResults.filterBy;
      const pageNumber=requestType==='RIDE'?displayData.matchingResults.rideRequestPageNumber:displayData.matchingResults.assetRequestPageNumber;
      const sortBy=displayData.matchingResults.sortBy;
      const sortByOrder=displayData.matchingResults.sortBy;
      let offset = (pageNumber - 1) * limit;
      const dataToGetRequests = {
         filterBy: filter,
         sortBy: sortBy,
         sortByOrder:sortByOrder,
         offset: offset,
         limit: limit,
      };
      await getAllMatchingRequests(requestType,dataToGetRequests);
   }
   @action.bound
   addRequestButton(requestType) {
      const {history}=this.props;
     switch(requestType){
        case 'RIDE':{
           history.push('/commute-dashboard/ride-request');
           return ;
        }
        case 'ASSET':{
           history.push('/commute-dashboard/asset-transport-request');
           return ;
        }
     }
   }
   render() {
      const {
         doNetWorkCallsForMatchingRequests,
         doNetWorkCallsForRequests,
         addRequestButton
      } = this;
      
      return (
         
         <DashBoard
            history={this.props.history}
            doNetWorkCallsForMatchingRequests={doNetWorkCallsForMatchingRequests}
            doNetWorkCallsForRequests={doNetWorkCallsForRequests}
            addRequestButton={addRequestButton}
         />
      );
   }
}
export default withRouter(withHeader(DashBoardRoute));