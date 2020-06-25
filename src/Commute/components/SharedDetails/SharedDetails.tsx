import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'

import { RiAddLine } from 'react-icons/ri'
import { DisplayDropDown } from '../Common/components/DisplayDropDown'
import { PaginationUI as Pagination } from '../Common/components/Pagination'
const filterOptions = {
   listTitle: '',
   listItems: [
      { key: 'ACTIVE', text: 'Pending', value: 'PENDING' },
      { key: 'EXPIRE', text: 'Expire', value: 'EXPIRED' }
   ],
   placeholder: 'Filter'
}

import {
   MyRequestsHeader,
   MyRequestType,
   MyRequestsDashboard,
   RequestHeader,
   NoOfRequests,
   FilterAndSort,
   Footer,
   Pages,
   AddShareButton
} from './styledComponents'
import { SharedRidesTable } from './ShareRides'
import { TravelInfoTable } from './TravelInfo'
import {
   SharedRides,
   TravelInfo
} from '../../stores/Models/SharedDetailsModels'
import { CommuteStore } from "../../stores/CommuteStore"

interface SharedDetailsProps{
   doNetWorkCallsForSharedDetails:()=>void,
   addShareButton:(shareType:string)=>void
} 

interface InjectedProps extends SharedDetailsProps {
   commuteStore: CommuteStore
 }
@inject('commuteStore')
@observer
class SharedDetails extends React.Component<SharedDetailsProps>{
   constructor(props) {
      super(props)
   }
   @action.bound
   doNetWorkCalls() {
      const { doNetWorkCallsForSharedDetails } = this.props
      doNetWorkCallsForSharedDetails()
   }

   getInjectedProps=():InjectedProps=>this.props as InjectedProps

   @action.bound
   onChangeFilter(filterBy:string) {
      const {
         commuteStore: { onChangeSharedDetailsFilter }
      } = this.getInjectedProps();
      onChangeSharedDetailsFilter(filterBy)
      this.doNetWorkCalls()
   }
   @action.bound
   onChangePageNumber = (event:any, data:{activePage:number}) => {
      const {
         commuteStore: { onChangeSharedDetailsPageNumber }
      } = this.getInjectedProps();
      onChangeSharedDetailsPageNumber(data.activePage)
      this.doNetWorkCalls()
   }
   @action.bound
   onClickShareType(shareType:string) {
      const {
         commuteStore: { onChangeSharedDetailsShareType }
      } = this.getInjectedProps();
      onChangeSharedDetailsShareType(shareType)
      this.doNetWorkCalls()
   }
   @action.bound
   getSharedDetails():any {
      const {
         commuteStore: { displayData }
      } = this.getInjectedProps();
      switch (displayData.sharedDetails.shareType) {
         case 'RIDE': {
            return displayData.sharedDetails.sharedRides
         }
         case 'TRAVEL INFO': {
            return displayData.sharedDetails.travelInfo
         }
      }
   }
   renderSuccessUI() {
      const {
         commuteStore: {
            displayData,
            getSharedRidesStatus,
            getSharedRidesError,
            getTravelInfoAPIStatus,
            getTravelInfoAPIError
         },
         addShareButton
      } = this.getInjectedProps()
      const { doNetWorkCallsForSharedDetails } = this.props
      let shareType = displayData.sharedDetails.shareType
      const { getSharedDetails } = this

      switch (shareType) {
         case 'RIDE': {
            return(
                <SharedRidesTable
                  getShares={getSharedDetails}
                  getSharedRidesStatus={getSharedRidesStatus}
                  getSharedRidesError={getSharedRidesError}
                  doNetworkCalls={doNetWorkCallsForSharedDetails}
                  addShareButton={addShareButton}
                  shareType={shareType}
               />
            )
         }
         case 'TRAVEL INFO': {
            return (
               <TravelInfoTable
                  doNetworkCalls={doNetWorkCallsForSharedDetails}
                  getTravelDetails={getSharedDetails}
                  getTravelInfoAPIStatus={getTravelInfoAPIStatus}
                  getTravelInfoAPIError={getTravelInfoAPIError}
                  addShareButton={addShareButton}
                  shareType={shareType}
               />
            )
         }
      }
   }

   render() {
      const {
         commuteStore: { displayData, limit },
         addShareButton
      } = this.getInjectedProps()
      const {
         onClickShareType,
         onChangePageNumber,
         onChangeFilter,
         getSharedDetails
      } = this

      let shareType = displayData.sharedDetails.shareType
      const noOfShareDetails =
         shareType === 'RIDE'
            ? displayData.sharedDetails.noOfSharedRides
            : displayData.sharedDetails.noOfSharedTravelInfo

      const totalNumberOfPages = Math.ceil(noOfShareDetails / limit)
      const pageNumber =
         shareType === 'RIDE'
            ? displayData.sharedDetails.sharedRidePageNumber
            : displayData.sharedDetails.sharedTravelInfoPageNumber
      return (
         <MyRequestsDashboard key={Math.random() + shareType}>
            <MyRequestsHeader>
               <MyRequestType
                  onClick={() => onClickShareType('RIDE')}
                  isSelected={shareType === 'RIDE' ? true : false}
               >
                  {'RIDE'}
               </MyRequestType>
               <MyRequestType
                  onClick={() => onClickShareType('TRAVEL INFO')}
                  isSelected={shareType === 'TRAVEL INFO' ? true : false}
               >
                  {'TRAVEL INFO'}
               </MyRequestType>
            </MyRequestsHeader>
            <RequestHeader>
               {noOfShareDetails !== 0 ? (
                  <NoOfRequests>{noOfShareDetails} Request(s)</NoOfRequests>
               ) : (
                  ' '
               )}
               <FilterAndSort >
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                     displayError={false}
                  />
               </FilterAndSort>
            </RequestHeader>
            {this.renderSuccessUI()}
            {getSharedDetails().length !== 0 ? (
               <Footer>
                  <AddShareButton onClick={() => addShareButton(shareType)}>
                     <RiAddLine /> &nbsp;Share {shareType.toLowerCase()}
                  </AddShareButton>
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
export { SharedDetails }
