import React from 'react';
import {observer,inject} from 'mobx-react';
import {action} from 'mobx';
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { RiAddLine } from 'react-icons/ri'
import { DisplayDropDown } from '../Common/components/DisplayDropDown.js'

import { ShowRideRequests } from './ShowRideRequests.js'
import { ShowAssetTransport } from './ShowAssetTransport.js'

import {
   MyRequestsHeader,
   MyRequestType,
   MyRequestsDashboard,
   RequestHeader,
   NoOfRequests,
   FilterAndSort,
   Footer,
   Pages,
   AddRequestButton
} from './styledComponents.js'

import {
   MatchingRideRequestCard,
   MatchingAssetRequestCard
} from '../../stores/Models/MatchingRequestCard'
import strings from '../../i18n/strings.json'

const filterOptions = {
         listTitle: '',
         listItems: [
            { key: 'PENDING', text: 'Pending', value: 'PENDING' },
            { key: 'CONFIRMED', text: 'Confirmed', value: 'CONFIRM' },
            { key: 'EXPIRE', text: 'Expire', value: 'EXPIRED' }
         ],
         placeholder: 'Filter'
      }
      const sortOptionsForRides = {
         listTitle: '',
         listItems: [
            { key: 'datetime', text: 'dateTime', value: 'datetime' },
            { key: 'Seats', text: 'Seats', value: 'no_of_seats' }
         ],
         placeholder: 'Sort'
      }
      const sortOptionsForAssets = {
         listTitle: '',
         listItems: [
            { key: 'datetime', text: 'Date Time', value: 'datetime' },
            { key: 'Assets Quantity', text: 'Assets Quantity', value: 'assets_quantity' }
         ],
         placeholder: 'Sort'
      }

@inject('commuteStore')
@observer
class Requests extends React.Component{
    constructor(){
        super();
    }
      
      onChangePageNumber = (event, data) => {
            const {commuteStore:{onChangePageNumber}}=this.props;
            onChangePageNumber('myRequests',data.activePage);
            const {doNetWorkCallsForRequests}=this.props;
            doNetWorkCallsForRequests();
            
      }
      onClickRequestType = requestType => {
         const {commuteStore:{onChangeRequestType}}=this.props;
         onChangeRequestType('myRequests',requestType);
         const {doNetWorkCallsForRequests}=this.props;
            doNetWorkCallsForRequests();
      }
      @action.bound
      onChangeSortField(sortBy) {
         const {commuteStore:{onChangeSortField}}=this.props;
         onChangeSortField('myRequests',sortBy);
         const {doNetWorkCallsForRequests}=this.props;
            doNetWorkCallsForRequests();
      }
      @action.bound
      onChangeFilter(filterBy) {
         const {commuteStore:{onChangeFilter}}=this.props;
         onChangeFilter('myRequests',filterBy);
         const {doNetWorkCallsForRequests}=this.props;
            doNetWorkCallsForRequests();
         
      }
      @action.bound
      onClickAddButtonInRequest(userDetails) {
         
      }
      
      @action.bound
      getRequests(){
         const {commuteStore:{displayData}}=this.props;
         switch(displayData.myRequests.requestType){
            case 'RIDE':{
               return displayData.myRequests.rideRequests;
            }
            case 'ASSET':{
               return displayData.myRequests.assetRequests;
            }
         }
      }
   @action.bound
   renderSuccessUI(){
      const {commuteStore:{displayData,getMyRideRequestAPIStatus,getMyRideRequestAPIError,getMyAssetRequestAPIStatus,getMyAssetRequestAPIError}}=this.props;
      const {doNetWorkCallsForRequests}=this.props;
        let requestType=displayData.myRequests.requestType;
        const {getRequests}=this;
      
      switch(requestType){
         case 'RIDE':{
            return (
               <ShowRideRequests
                  getRequests={getRequests}
                  doNetWorkCalls={doNetWorkCallsForRequests}
                  getMyRideRequestAPIStatus={getMyRideRequestAPIStatus}
                  getMyRideRequestAPIError={getMyRideRequestAPIError}
               />)
         }
         case 'ASSET':{
            return (
               <ShowAssetTransport
                  getRequests={getRequests}
                  doNetWorkCalls={doNetWorkCallsForRequests}
                  getMyAssetRequestAPIStatus={getMyAssetRequestAPIStatus}
                  getMyAssetRequestAPIError={getMyAssetRequestAPIError}
               />)
         }
      }
   }
    render(){
        const {onClickRequestType,onChangeSortField,onChangeFilter,onChangePageNumber,getRequests}=this;
        const {commuteStore:{displayData,limit},addRequestButton}=this.props;
        let requestType=displayData.myRequests.requestType;
        const noOfRequests=requestType==='RIDE'?displayData.myRequests.noOfRideRequests:displayData.myRequests.noOfAssetRequests;
        
        const totalNumberOfPages =Math.ceil(noOfRequests/limit);
        const pageNumber=requestType==='RIDE'?displayData.myRequests.rideRequestPageNumber:displayData.myRequests.assetRequestPageNumber;
       
        return (
           <MyRequestsDashboard key={Math.random() + requestType}>
            <MyRequestsHeader>
               <MyRequestType
                  onClick={() => onClickRequestType('RIDE')}
                  isSelected={requestType === 'RIDE' ? true : false}
               >
                  {strings.text.ride.toUpperCase()}
               </MyRequestType>
               <MyRequestType
                  onClick={() => onClickRequestType('ASSET')}
                  isSelected={requestType === 'ASSET' ? true : false}
               >
                  {strings.text.asset.toUpperCase()}
               </MyRequestType>
            </MyRequestsHeader>
            <RequestHeader>
               {getRequests().length!==0?<NoOfRequests>{noOfRequests} Request(s)</NoOfRequests>:''}

               <FilterAndSort>
                  <DisplayDropDown
                     data={requestType==='RIDE'?sortOptionsForRides:sortOptionsForAssets}
                     onChange={onChangeSortField}
                  />
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                  />
               </FilterAndSort>
            </RequestHeader>
            
            {this.renderSuccessUI()}
            
            {getRequests().length!==0?<Footer>
               <AddRequestButton
                  onClick={() => addRequestButton(requestType)}
               >
                  <RiAddLine /> &nbsp;Add {requestType}
               </AddRequestButton>
               {totalNumberOfPages !== 0 ? (
                  <Pages>
                     {pageNumber} to {totalNumberOfPages}
                  </Pages>
               ) : (
                  ''
               )}
               <Pagination
                  boundaryRange={0}
                  defaultActivePage={pageNumber}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={totalNumberOfPages}
                  onPageChange={onChangePageNumber}
               />
            </Footer>:''}
            
            </MyRequestsDashboard>
            );
    }
}
export {Requests}