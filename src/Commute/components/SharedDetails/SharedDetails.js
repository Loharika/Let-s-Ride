import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { RiAddLine } from 'react-icons/ri'
import { DisplayDropDown } from '../Common/components/DisplayDropDown.js'

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
   AddRequestButton
} from './styledComponents.js'
import { SharedRidesTable } from './ShareRides.js'
import { TravelInfoTable } from './TravelInfo.js'
import {
   SharedRides,
   TravelInfo
} from '../../stores/Models/SharedDetailsModels'

@inject('commuteStore')
@observer
class SharedDetails extends React.Component {
   constructor(props) {
      super(props)
   }
   @action.bound
   onChangeFilter(filterBy) {
      //alert(filterBy);
      const {
         commuteStore: { onChangeSharedDetailsFilter }
      } = this.props
      onChangeSharedDetailsFilter(filterBy)
      const { doNetWorkCallsForSharedDetails } = this.props
      doNetWorkCallsForSharedDetails()
   }
   @action.bound
   onChangePageNumber = (event, data) => {
      //alert(data.activePage);
      const {
         commuteStore: { onChangeSharedDetailsPageNumber }
      } = this.props
      onChangeSharedDetailsPageNumber(data.activePage)
      const { doNetWorkCallsForSharedDetails } = this.props
      doNetWorkCallsForSharedDetails()
   }
   @action.bound
   onClickShareType(shareType) {
      //alert(shareType);
      const {
         commuteStore: { onChangeSharedDetailsShareType }
      } = this.props
      onChangeSharedDetailsShareType(shareType)
      const { doNetWorkCallsForSharedDetails } = this.props
      doNetWorkCallsForSharedDetails()
   }
   @action.bound
   getSharedDetails() {
      const {
         commuteStore: { displayData }
      } = this.props
      switch (displayData.sharedDetails.shareType) {
         case 'RIDE': {
            return displayData.sharedDetails.sharedRides
         }
         case 'TRAVEL INFO': {
            return displayData.sharedDetails.travelInfo
         }
      }
   }
   @action.bound
   getSharedDetailsAsModels() {
      const { getSharedDetails } = this

      let modelsForSharedDetails = getSharedDetails().map(share => {
         if (!share.hasOwnProperty('transport_medium')) {
            return new SharedRides(share)
         } else {
            return new TravelInfo(share)
         }
      })

      return modelsForSharedDetails
   }

   renderSuccessUI() {
      const {
         commuteStore: {
            displayData,
            getSharedRidesStatus,
            getSharedRidesError,
            getTravelInfoAPIStatus,
            getTravelInfoAPIError
         }
      } = this.props
      const { doNetWorkCallsForSharedDetails } = this.props
      let shareType = displayData.sharedDetails.shareType
      const { getSharedDetailsAsModels } = this

      switch (shareType) {
         case 'RIDE': {
            return (
               //<div>RIDE</div>
               <SharedRidesTable
                  getShares={getSharedDetailsAsModels}
                  getSharedRidesStatus={getSharedRidesStatus}
                  getSharedRidesError={getSharedRidesError}
                  doNetworkCalls={doNetWorkCallsForSharedDetails}
               />
            )
         }
         case 'TRAVEL INFO': {
            return (
               //<div>Travel Info</div>
               <TravelInfoTable
                  doNetworkCalls={doNetWorkCallsForSharedDetails}
                  getTravelDetails={getSharedDetailsAsModels}
                  getTravelInfoAPIStatus={getTravelInfoAPIStatus}
                  getTravelInfoAPIError={getTravelInfoAPIError}
               />
            )
         }
      }
   }

   render() {
      const {
         commuteStore: { displayData, limit }
      } = this.props
      const { onClickShareType, onChangePageNumber, onChangeFilter } = this

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
               <NoOfRequests>{noOfShareDetails} Request(s)</NoOfRequests>

               <FilterAndSort>
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                  />
               </FilterAndSort>
            </RequestHeader>
            {this.renderSuccessUI()}
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
            </Footer>
         </MyRequestsDashboard>
      )
   }
}
export { SharedDetails }

/*{
            "origin":"hyderabad",
            "destination":"kurnool",
            "flexible_with_time":true,
            "start_datetime":"Thu Sep 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "end_datetime":"Thu Oct 04 2020 21:46:04 GMT+0530 (India Standard Time)",
            "datetime":"null",
            "travel_medium":"BUS",
            "assets_quantity":4,
            "status":"EXPIRED"
        },
        {
            "origin":"hyderabad",
            "destination":"kurnool",
            "flexible_with_time":true,
            "start_datetime":"Thu Apr 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "end_datetime":"Thu May 14 2020 21:46:04 GMT+0530 (India Standard Time)",
            "datetime":"null",
            "travel_medium":"BUS",
            "assets_quantity":4,
            "status":"ACTIVE"
        },
        {
            "origin":"kurnool",
            "destination":"kadapa",
            "flexible_with_time":false,
            "start_datetime":"null"
            "end_datetime":"null",
            "datetime":"Thu Apr 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "travel_medium":"FLIGHT",
            "assets_quantity":2,
            "status":"EXPIRED"
        },
        {
            "origin":"hyderabad",
            "destination":"kurnool",
            "flexible_with_time":true,
            "start_datetime":"Thu Apr 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "end_datetime":"Thu May 14 2020 21:46:04 GMT+0530 (India Standard Time)",
            "datetime":"null",
            "travel_medium":"BUS",
            "assets_quantity":4,
            "status":"ACTIVE"
        },
        {
            "origin":"hyderabad",
            "destination":"kurnool",
            "flexible_with_time":true,
            "start_datetime":"Thu Sep 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "end_datetime":"Thu Oct 04 2020 21:46:04 GMT+0530 (India Standard Time)",
            "datetime":"null",
            "travel_medium":"BUS",
            "assets_quantity":4,
            "status":"EXPIRED"
        },
        {
            "origin":"hyderabad",
            "destination":"kurnool",
            "flexible_with_time":true,
            "start_datetime":"Thu Apr 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "end_datetime":"Thu May 14 2020 21:46:04 GMT+0530 (India Standard Time)",
            "datetime":"null",
            "travel_medium":"BUS",
            "assets_quantity":4,
            "status":"ACTIVE"
        },
        {
            "origin":"kurnool",
            "destination":"kadapa",
            "flexible_with_time":false,
            "start_datetime":"null"
            "end_datetime":"null",
            "datetime":"Thu Apr 31 2020 21:46:04 GMT+0530 (India Standard Time)",
            "travel_medium":"FLIGHT",
            "assets_quantity":2,
            "status":"EXPIRED"
        },*/
