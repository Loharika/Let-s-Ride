import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { DashBoard } from '../../components/CommuteDashboard'

import {withHeader} from '../../Hocs/withHeader';
import strings from '../../i18n/strings.json'

@inject('commuteStore', 'authStore')
@observer
class DashBoardRoute extends React.Component {
   @observable displayRequestType
   @observable filter
   @observable sortBy
   @observable pageNumber
   @observable totalNumberOfPages
   @observable sortByOrder;
   @observable matchingRequestsFilter

   constructor() {
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
   @action.bound
   init() {
      this.displayRequestType = 'ride'
      this.filter = 'SELECT'
      this.sortBy = 'SELECT'
      this.pageNumber = 1
      this.totalNumberOfPages = 0;
      this.sortByOrder='ASC';
      this.matchingRequestsFilter = 'RIDE' //ALL RIDE ASSET
      
   }
   componentDidMount() {
      
      const {
         doNetWorkCallsForMatchingRequests
      } = this
      doNetWorkCallsForMatchingRequests();
      
   }
   @action.bound
   async doNetWorkCallsForMyRequests() {
      console.log("my requests")
      
      const {
         commuteStore: { getMyRideRequests, getMyAssetRequests }
      } = this.props
      const {
         authStore: { access_token }
      } = this.props
      const { displayRequestType, filter, sortBy, limit, pageNumber } = this
      let offset = (pageNumber - 1) * this.limit
      const dataToGetRequests = {
         access_token: access_token,
         filterBy: filter,
         sortBy: sortBy,
         offset: offset,
         limit: limit,
         sortByOrder:this.sortByOrder,
      }
      switch (displayRequestType) {
         case 'ride': {
            await getMyRideRequests(dataToGetRequests)
            break
         }
         case 'asset': {
            await getMyAssetRequests(dataToGetRequests)
            break
         }
      }
   }
   @action.bound
   async doNetWorkCallsForMatchingRequests() {
      console.log("matching resuts")
      const {
         commuteStore: {
            getAllMatchingRequests
         }
      } = this.props
      const {
         authStore: { access_token }
      } = this.props
     
      const dataToGetMatchingRequests = {
         access_token: access_token,
      }
      await getAllMatchingRequests(dataToGetMatchingRequests)
      
      
   }
   @action.bound
   getRequests(requestType) {
      const {commuteStore: { rideRequests, noOfRideRequests,assetRequests,noOfAssetRequests }} = this.props
      switch(requestType){
         case 'ride' :{
            this.totalNumberOfPages = Math.ceil(noOfRideRequests / this.limit)
            return rideRequests
         }
         case 'asset' :{
            this.totalNumberOfPages = Math.ceil(noOfAssetRequests / this.limit)
            return assetRequests
         }
         
      }
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
   onChangePageNumber = (event, data) => {
      this.pageNumber = data.activePage
      const { doNetWorkCallsForMyRequests } = this
      doNetWorkCallsForMyRequests()
   }
   onClickRequestType = requestType => {
      const { init } = this
      init()
      this.displayRequestType = requestType
      const { doNetWorkCallsForMyRequests } = this
      doNetWorkCallsForMyRequests()
   }
   @action.bound
   onChangeSortBy(event) {
      this.sortBy = event
      const { doNetWorkCallsForMyRequests } = this
      doNetWorkCallsForMyRequests()
   }
   @action.bound
   onChangeFilter(event) {
      this.filter = event
      const { doNetWorkCallsForMyRequests } = this
      doNetWorkCallsForMyRequests()
   }
   @action.bound
   addRequestButton(requestType) {
      const {history}=this.props;
     switch(requestType){
        case 'ride':{
           history.push('/commute-dashboard/ride-request');
           return ;
        }
        case 'asset':{
           history.push('/commute-dashboard/asset-transport-request');
           return ;
        }
     }
   }
   @action.bound
   onChangeMatchingRequestsFilter(filterBy) {
      this.matchingRequestsFilter = filterBy
      const { doNetWorkCallsForMatchingRequests } = this
      doNetWorkCallsForMatchingRequests()
   }
   @action.bound
   onClickSignOutButton = () => {
      const {
         authStore: { userSignOut }
      } = this.props
      userSignOut()
   }
   render() {
      const {
         onClickSignOutButton,
         limit,
         pageNumber,
         displayRequestType,
         onChangePageNumber,
         onClickRequestType,
         rideRequestTableHeaders,
         assetRequestTableHeaders,
         totalNumberOfPages,

         onChangeSortBy,
         onChangeFilter,
         addRequestButton,
         getRequests,
         doNetWorkCallsForMyRequests,

         getMatchingRequests,
         doNetWorkCallsForMatchingRequests,
         onChangeMatchingRequestsFilter
      } = this
      
      return (
         
         <DashBoard
            history={this.props.history}
            limit={limit}
            pageNumber={pageNumber}
            displayRequestType={displayRequestType}
            rideRequestTableHeaders={rideRequestTableHeaders}
            assetRequestTableHeaders={assetRequestTableHeaders}
            
            onClickSignOutButton={onClickSignOutButton}
            
            getRequests={getRequests}
            onChangePageNumber={onChangePageNumber}
            onClickRequestType={onClickRequestType}
            onChangeSortBy={onChangeSortBy}
            onChangeFilter={onChangeFilter}
            
            addRequestButton={addRequestButton}
            totalNumberOfPages={totalNumberOfPages}
            
            doNetWorkCallsForMyRequests={doNetWorkCallsForMyRequests}
            onChangeMatchingRequestsFilter={onChangeMatchingRequestsFilter}
            getMatchingRequests={getMatchingRequests}
            doNetWorkCallsForMatchingRequests={doNetWorkCallsForMatchingRequests}
         />
      )
   }
}
export default withRouter(withHeader(DashBoardRoute))
