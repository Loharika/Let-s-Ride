import React from 'react';
import {observer,inject} from 'mobx-react';
import {observable,action} from 'mobx';

import {
   MyRequestsHeader,
   MyRequestType,
   MyRequestsDashboard,
   RequestHeader,
   NoOfRequests,
   FilterAndSort,
   Footer,
   AddRequestButton,
   Pages,
   MyRequestsTitle
} from './styledComponents.js'

import {
   MatchingRideRequestCard,
   MatchingAssetRequestCard
} from '../../stores/Models/MatchingRequestCard'
import strings from '../../i18n/strings.json'

@inject('commuteStore')
@observer
class MatchingResults extends React.Component{
    @observable displayRequestType
   @observable filter
   @observable sortBy
   @observable pageNumber
   @observable totalNumberOfPages
    constructor(){
        super();
        this.limit = 4
      this.rideRequestTableHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NUMBER OF PEOPLE',
         'LUGGAGE QUANTITY',
         'ACCEPTED PERSON DETAILS',
         'STATUS'
      ]
      this.assetRequestTableHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NUMBER OF PEOPLE',
         'ASSET TYPE',
         'ASSET SENSITIVITY',
         'ACCEPTED PERSON DETAILS',
         'STATUS'
      ]
      this.init()
    }
   //  getQueryParametersFromMatchingResults() {
   //        return {
   //           displayRequestType:this.displayRequestType,
   //             filter:this.filter,
   //           sortBy:this.sortBy,
   //           pageNumber:this.pageNumber,
   //           totalNumberOfPages:this.totalNumberOfPages
             
   //        }
   //    }
    @action.bound
    init() {
      this.displayRequestType = 'ride'
      this.filter = 'SELECT'
      this.sortBy = 'SELECT'
      this.pageNumber = 1
      this.totalNumberOfPages = 0;
      this.matchingRequestsFilter = 'RIDE' //ALL RIDE ASSET
   }
    onChangePageNumber = (event, data) => {
      this.pageNumber = data.activePage
      const { doNetWorkCallsForMatchingRequests } = this.props;
      
      doNetWorkCallsForMatchingRequests(
         {
         access_token: this.props.authStore.access_token,
         filterBy: 'SELECT',
         sortBy: 'SELECT',
         offset: 0,
         limit: 4,
         sortByOrder:'ASC',
      }
         )
   }
   onClickRequestType = requestType => {
      const { init } = this
      init()
      this.displayRequestType = requestType
      const { doNetWorkCallsForMatchingRequests } = this.props;
      doNetWorkCallsForMatchingRequests()
   }
   @action.bound
   onChangeSortBy(event) {
      this.sortBy = event
      const { doNetWorkCallsForMatchingRequests } = this.props;
      doNetWorkCallsForMatchingRequests()
   }
   @action.bound
   onChangeFilter(event) {
      this.filter = event
      const { doNetWorkCallsForMatchingRequests } = this.props;
      doNetWorkCallsForMatchingRequests()
   }
    @action.bound
    getMatchingRequests() {
      const {
         commuteStore: { matchingRequests }
      } = this.props
       const { matchingRequestsFilter } = this
      switch (matchingRequestsFilter) {
         case 'RIDE': {
            return matchingRequests.filter(request=>{
               if(!request.hasOwnProperty('assetType')){
                  return request;
               }
            })
         }
         case 'ASSETS': {
            return matchingRequests.filter(request=>{
               if(request.hasOwnProperty('assetType')){
                  return request;
               }
            })
         }
         case 'ALL': {
            return matchingRequests;
         }
      }
      return matchingRequests
   }
    @action.bound
   getMatchingRequestsWithModels() {
      const { getMatchingRequests } = this;
      let modelsForMatchingRequests = getMatchingRequests().map(request => {
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
   onClickAddButtonInRequest(userDetails) {
      alert(userDetails)
   }
    render(){
        console.log(this.getMatchingRequestsWithModels());
        const {displayRequestType,onClickRequestType}=this;
        return (
           <MyRequestsDashboard key={Math.random() + displayRequestType}>
            <MyRequestsHeader>
               <MyRequestType
                  onClick={() => onClickRequestType(strings.requestType.ride)}
                  isSelected={displayRequestType === 'ride' ? true : false}
               >
                  {strings.text.ride.toUpperCase()}
               </MyRequestType>
               <MyRequestType
                  onClick={() => onClickRequestType(strings.requestType.asset)}
                  isSelected={displayRequestType === 'asset' ? true : false}
               >
                  {strings.text.asset.toUpperCase()}
               </MyRequestType>
            </MyRequestsHeader>
            
            
            </MyRequestsDashboard>
            );
    }
}
export {MatchingResults};