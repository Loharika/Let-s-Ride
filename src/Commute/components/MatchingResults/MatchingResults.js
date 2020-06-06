import React from 'react';
import {observer,inject} from 'mobx-react';
import {action} from 'mobx';
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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
   NoDataFound
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
            { key: 'CONFIRMED', text: 'Confirmed', value: 'CONFIRMED' },
            { key: 'EXPIRE', text: 'Expire', value: 'EXPIRE' }
         ],
         placeholder: 'Filter'
      }
      const sortOptions = {
         listTitle: '',
         listItems: [
            { key: 'datetime', text: 'dateTime', value: 'datetime' },
            { key: 'Seats', text: 'Seats', value: 'no_of_seats' }
         ],
         placeholder: 'Sort'
      }

@inject('commuteStore')
@observer
class MatchingResults extends React.Component{
    constructor(){
        super();
      this.rideRequestTableHeaders = [
         'REQUESTED PERSON DETAILS',
         'FROM',
         'TO',
         'DATE AND TIME',
         'NUMBER OF PEOPLE',
         'LUGGAGE QUANTITY',
         'STATUS'
      ]
      this.assetRequestTableHeaders = [
         'REQUESTED PERSON DETAILS',
         'FROM',
         'TO',
         'DATE AND TIME',
         'NUMBER OF PEOPLE',
         'ASSET TYPE',
         'ASSET SENSITIVITY',
         'WHOM TO DELIVER',
         'STATUS'
      ]
    }
      
      onChangePageNumber = (event, data) => {
            const {commuteStore:{onChangePageNumber}}=this.props;
            onChangePageNumber('matchingResults',data.activePage);
            const {doNetWorkCallsForMatchingRequests}=this.props;
            doNetWorkCallsForMatchingRequests();
            
      }
      onClickRequestType = requestType => {
         const {commuteStore:{onChangeRequestType}}=this.props;
         onChangeRequestType('matchingResults',requestType);
         const {doNetWorkCallsForMatchingRequests}=this.props;
            doNetWorkCallsForMatchingRequests();
      }
      @action.bound
      onChangeSortBy(sortBy) {
         const {commuteStore:{onChangeSortBy}}=this.props;
         onChangeSortBy('matchingResults',sortBy);
         const {doNetWorkCallsForMatchingRequests}=this.props;
            doNetWorkCallsForMatchingRequests();
      }
      @action.bound
      onChangeFilter(filterBy) {
         const {commuteStore:{onChangeFilter}}=this.props;
         onChangeFilter('matchingResults',filterBy);
         const {doNetWorkCallsForMatchingRequests}=this.props;
            doNetWorkCallsForMatchingRequests();
         
      }
      
      @action.bound
      getMatchingResults(){
         const {commuteStore:{displayData}}=this.props;
         switch(displayData.matchingResults.requestType){
            case 'RIDE':{
               return displayData.matchingResults.rideRequests
            }
            case 'ASSET':{
               return displayData.matchingResults.assetRequests
            }
         }
      }
      
       @action.bound
      getMatchingRequestsAsModels() {
         const { getMatchingResults } = this;
         let modelsForMatchingRequests = getMatchingResults().map(request => {
            if (request.hasOwnProperty('asset_type')) {
               const requestData = {
                  request: request,
                  addButtonFunction: this.onClickAddButtonInRequest,
               }
               return new MatchingAssetRequestCard(requestData)
            } else {
               const requestData = {
                  request: request,
                  addButtonFunction: this.onClickAddButtonInRequest,
               }
               return new MatchingRideRequestCard(requestData)
            }
         })
         return modelsForMatchingRequests
   }
   @action.bound
   renderSuccessUI(){
      const {commuteStore:{displayData,getMatchingRequestAPIStatus,getMatchingRequestAPIError,getAcceptingMatchedRequestAPIStatus}}=this.props;
      const {doNetWorkCallsForMatchingRequests}=this.props;
        let requestType=displayData.matchingResults.requestType;
        const {getMatchingRequestsAsModels,rideRequestTableHeaders,assetRequestTableHeaders}=this;

      switch(requestType){
         case 'RIDE':{
            return (
               <ShowRideRequests
                  getRequests={getMatchingRequestsAsModels}
                  tableHeaders={rideRequestTableHeaders}
                  doNetWorkCalls={doNetWorkCallsForMatchingRequests}
                  getMatchingRequestAPIStatus={getMatchingRequestAPIStatus}
                  getMatchingRequestAPIError={getMatchingRequestAPIError}
                  getAcceptingMatchedRequestAPIStatus={getAcceptingMatchedRequestAPIStatus}
               />);
            
            
         }
         case 'ASSET':{
            return (
               <ShowAssetTransport
                  getRequests={getMatchingRequestsAsModels}
                  tableHeaders={assetRequestTableHeaders}
                  doNetWorkCalls={doNetWorkCallsForMatchingRequests}
                  getMatchingRequestAPIStatus={getMatchingRequestAPIStatus}
                  getMatchingRequestAPIError={getMatchingRequestAPIError}
                  getAcceptingMatchedRequestAPIStatus={getAcceptingMatchedRequestAPIStatus}
               />)
         }
      }
   }
   @action.bound
      onClickAddButtonInRequest(requestId) {
         const {commuteStore:{acceptTheMatchedRequest}}=this.props;
         acceptTheMatchedRequest(requestId);
         
      }
    render(){
        const {onClickRequestType,onChangeSortBy,onChangeFilter,onChangePageNumber,getMatchingRequestsAsModels}=this;
        const {commuteStore:{displayData,limit}}=this.props;
        let requestType=displayData.matchingResults.requestType;
        const noOfRequests=requestType==='RIDE'?displayData.matchingResults.noOfRideRequests:displayData.matchingResults.noOfAssetRequests;
        const totalNumberOfPages=Math.ceil(noOfRequests/limit);
        const pageNumber=requestType==='RIDE'?displayData.matchingResults.rideRequestPageNumber:displayData.matchingResults.assetRequestPageNumber;
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
               {getMatchingRequestsAsModels().length!==0?<NoOfRequests>{noOfRequests} Request(s)</NoOfRequests>:''}

               <FilterAndSort>
                  <DisplayDropDown
                     data={sortOptions}
                     onChange={onChangeSortBy}
                  />
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                  />
               </FilterAndSort>
            </RequestHeader>
            
            {this.renderSuccessUI()}
            {getMatchingRequestsAsModels().length!==0?
            <Footer>
               
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
export {MatchingResults}