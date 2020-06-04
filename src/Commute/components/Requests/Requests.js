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
            { key: 'SELECT', text: 'All', value: 'SELECT' },
            { key: 'ACTIVE', text: 'Active', value: 'ACTIVE' },
            { key: 'EXPIRE', text: 'Expire', value: 'EXPIRE' }
         ],
         placeholder: 'Filter'
      }
      const sortOptions = {
         listTitle: '',
         listItems: [
            { key: 'SELECT', text: 'All', value: 'SELECT' },
            { key: 'DATE', text: 'Date', value: 'DATE' },
            { key: 'TIME', text: 'Time', value: 'TIME' }
         ],
         placeholder: 'Sort'
      }

@inject('commuteStore')
@observer
class Requests extends React.Component{
    constructor(){
        super();
      this.rideRequestTableHeaders = [
         'ACCEPTED PERSON DETAILS',
         'FROM',
         'TO',
         'DATE AND TIME',
         'NUMBER OF PEOPLE',
         'LUGGAGE QUANTITY',
         'STATUS'
      ]
      this.assetRequestTableHeaders = [
         'ACCEPTED PERSON DETAILS',
         'FROM',
         'TO',
         'DATE AND TIME',
         'NUMBER OF PEOPLE',
         'ASSET TYPE',
         'ASSET SENSITIVITY',
         'STATUS'
      ]
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
      onChangeSortBy(sortBy) {
         const {commuteStore:{onChangeSortBy}}=this.props;
         onChangeSortBy('myRequests',sortBy);
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
      getMatchingResults(){
         const {commuteStore:{displayData}}=this.props;
         switch(displayData.myRequests.requestType){
            case 'RIDE':{
               return displayData.myRequests.rideRequests
            }
            case 'ASSET':{
               return displayData.myRequests.assetRequests
            }
         }
      }
       @action.bound
      getMatchingRequestsAsModels() {
         const { getMatchingResults } = this;
         let modelsForMatchingRequests = getMatchingResults().map(request => {
            if (request.hasOwnProperty('assetType')) {
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
      const {commuteStore:{displayData,getMyRideRequestAPIStatus,getMyRideRequestAPIError,getMyAssetRequestAPIStatus,getMyAssetRequestAPIError}}=this.props;
      const {doNetWorkCallsForRequests}=this.props;
        let requestType=displayData.myRequests.requestType;
        const {rideRequestTableHeaders,assetRequestTableHeaders,getMatchingResults}=this;
      
      switch(requestType){
         case 'RIDE':{
            return (
               <ShowRideRequests
                  getRequests={getMatchingResults}
                  tableHeaders={rideRequestTableHeaders}
                  doNetWorkCalls={doNetWorkCallsForRequests}
                  getMyRideRequestAPIStatus={getMyRideRequestAPIStatus}
                  getMyRideRequestAPIError={getMyRideRequestAPIError}
               />)
         }
         case 'ASSET':{
            return (
               <ShowAssetTransport
                  getRequests={getMatchingResults}
                  tableHeaders={assetRequestTableHeaders}
                  doNetWorkCalls={doNetWorkCallsForRequests}
                  getMyAssetRequestAPIStatus={getMyAssetRequestAPIStatus}
                  getMyAssetRequestAPIError={getMyAssetRequestAPIError}
               />)
         }
      }
   }
    render(){
        const {onClickRequestType,onChangeSortBy,onChangeFilter,onChangePageNumber}=this;
        const {commuteStore:{displayData,limit},addRequestButton}=this.props;
        let requestType=displayData.myRequests.requestType;
        const noOfRequests=requestType==='RIDE'?displayData.myRequests.noOfRideRequests:displayData.myRequests.noOfAssetRequests;
        const totalNumberOfPages=Math.ceil(noOfRequests/limit);
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
               <NoOfRequests>{noOfRequests} Request(s)</NoOfRequests>

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
            <Footer>
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
            </Footer>
            </MyRequestsDashboard>
            );
    }
}
export {Requests}