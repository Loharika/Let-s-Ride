import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'
import { DisplayDropDown } from '../Common/components/DisplayDropDown'
import { PaginationUI as Pagination } from '../Common/components/Pagination'
import { ShowRideRequests } from './ShowRideRequests'
import { ShowAssetTransport } from './ShowAssetTransport'

import {
   MyRequestsHeader,
   MyRequestType,
   MyRequestsDashboard,
   RequestHeader,
   NoOfRequests,
   FilterAndSort,
   Footer,
   Pages,
   DisplayTable
} from './styledComponents'

import {
   MatchingRideRequestCard,
   MatchingAssetRequestCard
} from '../../stores/Models/MatchingRequestCard'
import strings from '../../i18n/strings.json'
import { CommuteStore } from "../../stores/CommuteStore/index"

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
type MatchingResultsProps={ 
   key: string
   doNetWorkCallsForMatchingRequests: () => void}

   interface InjectedProps extends MatchingResultsProps {
      commuteStore: CommuteStore
    }
@inject('commuteStore')
@observer
class MatchingResults extends React.Component <MatchingResultsProps>{
   rideRequestTableHeaders:string[];
   assetRequestTableHeaders:string[];
   constructor(props) {
      super(props)
      this.rideRequestTableHeaders= [
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
   @action.bound
   doNetWorkCalls() {
      const { doNetWorkCallsForMatchingRequests } = this.props
      doNetWorkCallsForMatchingRequests()
   }

   getInjectedProps=():InjectedProps=>this.props as InjectedProps
   onChangePageNumber = (event:any, data) => {
      const {
         commuteStore: { onChangePageNumber }
      } = this.getInjectedProps()
      onChangePageNumber('matchingResults', data.activePage)
      this.doNetWorkCalls()
   }
   onClickRequestType = requestType => {
      const {
         commuteStore: { onChangeRequestType }
      } = this.getInjectedProps()
      onChangeRequestType('matchingResults', requestType)
      this.doNetWorkCalls()
   }
   @action.bound
   onChangeSortBy(sortBy) {
      const {
         commuteStore: { onChangeSortBy }
      } = this.getInjectedProps()
      onChangeSortBy('matchingResults', sortBy)
      this.doNetWorkCalls()
   }
   @action.bound
   onChangeFilter(filterBy) {
      const {
         commuteStore: { onChangeFilter }
      } = this.getInjectedProps()
      onChangeFilter('matchingResults', filterBy)
      this.doNetWorkCalls()
   }

   @action.bound
   getMatchingResults():any {
      const {
         commuteStore: { displayData }
      } = this.getInjectedProps()
      switch (displayData.matchingResults.requestType) {
         case 'RIDE': {
            return displayData.matchingResults.rideRequests
         }
         case 'ASSET': {
            return displayData.matchingResults.assetRequests
         }
      }
   }
   @action.bound
   renderSuccessUI() {
      const {
         commuteStore: {
            displayData,
            getMatchingRequestAPIStatus,
            getMatchingRequestAPIError
         }
      } = this.getInjectedProps()
      const { doNetWorkCallsForMatchingRequests } = this.props
      let requestType = displayData.matchingResults.requestType
      const {
         getMatchingResults,
         rideRequestTableHeaders,
         assetRequestTableHeaders
      } = this
      const {doNetWorkCalls}=this;
      switch (requestType) {
         case 'RIDE': {
            return (
               <ShowRideRequests
                  getRequests={getMatchingResults}
                  tableHeaders={rideRequestTableHeaders}
                  doNetworkCalls={doNetWorkCalls}
                  getMatchingRequestAPIStatus={getMatchingRequestAPIStatus}
                  getMatchingRequestAPIError={getMatchingRequestAPIError}
               />
            )
         }
         case 'ASSET': {
            return (
               <ShowAssetTransport
                  getRequests={getMatchingResults}
                  tableHeaders={assetRequestTableHeaders}
                  doNetworkCalls={doNetWorkCalls}
                  getMatchingRequestAPIStatus={getMatchingRequestAPIStatus}
                  getMatchingRequestAPIError={getMatchingRequestAPIError}
               />
            )
         }
      }
   }

   render() {
       const {
         onClickRequestType,
         onChangeSortBy,
         onChangeFilter,
         onChangePageNumber,
         getMatchingResults
      } = this
      const {
         commuteStore: { displayData, limit }
      } = this.getInjectedProps()
      let requestType = displayData.matchingResults.requestType
      const noOfRequests =
         requestType === 'RIDE'
            ? displayData.matchingResults.noOfRideRequests
            : displayData.matchingResults.noOfAssetRequests
      const totalNumberOfPages = Math.ceil(noOfRequests / limit)
      const pageNumber =
         requestType === 'RIDE'
            ? displayData.matchingResults.rideRequestPageNumber
            : displayData.matchingResults.assetRequestPageNumber
      return (
         <MyRequestsDashboard>
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
               {getMatchingResults().length !== 0 ? (
                  <NoOfRequests>{noOfRequests} Request(s)</NoOfRequests>
               ) : (
                  ''
               )}

               <FilterAndSort noOfRequests={noOfRequests}>
                  <DisplayDropDown
                     data={sortOptions}
                     onChange={onChangeSortBy}
                     displayError={false}
                  />
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                     displayError={false}
                  />
               </FilterAndSort>
            </RequestHeader>
                        {this.renderSuccessUI()}
            
            {getMatchingResults().length !== 0 ? (
               <Footer>
                  {totalNumberOfPages !== 0 ? (
                     <Pages>
                        {pageNumber} to {totalNumberOfPages}
                     </Pages>
                  ) : (
                     ''
                  )}
                  <Pagination
                     totalNumberOfPages={totalNumberOfPages}
                     pageNumber={pageNumber}
                     onChangePageNumber={onChangePageNumber}
                  />
               </Footer>
            ) : (
               ''
            )}
         </MyRequestsDashboard>
      )
   }
}
export { MatchingResults }
