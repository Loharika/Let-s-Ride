import React from 'react'
import { observer } from 'mobx-react'

import { RiAddLine } from 'react-icons/ri'
import strings from '../../i18n/strings.json'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import { NoDataFound as NoDataFoundDisplay } from '../Common/components/NoDataFound'
import {RideRequestModel} from '../../stores/Models/MyRequestsModels'
type ShowRideRequestsProps={ 
      getRequests: () => Array<RideRequestModel>,
      doNetworkCalls: () => void,
     getMyRideRequestAPIStatus: any; 
     getMyRideRequestAPIError: any;
     addRequestButton:(requestType:string)=>void,
     requestType:string}
@observer
class ShowRideRequests extends React.Component <ShowRideRequestsProps>{
   tableHeaders:string[]
   constructor(props) {
      super(props)
      this.tableHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NO OF PEOPLE',
         'LUGGAGE QUANTITY',
         'ACCEPTED PERSON DETAILS',
         'STATUS'
      ]
   }
   renderSuccessUI = () => {
      const { tableHeaders } = this
      const { getRequests, addRequestButton, requestType } = this.props
      const rideRequests:RideRequestModel[]= getRequests()
      if (rideRequests.length !== 0) {
         return (
            <RequestDetailsTable>
               <TableRow key={Math.random()}>
                  {tableHeaders.map(eachOne => {
                     return (
                        <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(rideRequests).map((request:RideRequestModel) => {
                  return (
                     <TableRow key={Math.random() + request.id}>
                        <TableCellLeftAligned>
                           {request.origin}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {request.destination}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {request.flexibleWithTime ? (
                              <span>
                                 From:{request.startDatetime.slice(0, 21)}{' '}
                                 <br />
                                 To:{request.endDatetime.slice(0, 21)}
                              </span>
                           ) : (
                              request.dateTime.slice(0, 21)
                           )}
                        </TableCellLeftAligned>
                        <TableCellAlignedCenter>
                           {request.noOfSeats}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {request.luggageQuantity}
                        </TableCellAlignedCenter>
                        <TableCellLeftAligned>
                           {request.status === 'CONFIRM' ? (
                              <span>
                                 {request.acceptedPersonDetails.name}
                                 <br />
                                 {request.acceptedPersonDetails.mobile_number}
                              </span>
                           ) : request.status === 'PENDING' ? (
                              'Pending'
                           ) : (
                              'Expired'
                           )}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           <StatusButton status={request.status.toUpperCase()}>
                              {request.status.toUpperCase()}
                           </StatusButton>
                        </TableCellLeftAligned>
                     </TableRow>
                  )
               })}
            </RequestDetailsTable>
         )
      } else {
         return (
            <NoDataFoundDisplay
               noOfItems={rideRequests.length}
               onClick={addRequestButton}
               buttonType={requestType}
            />
         )
      }
   }
   render() {
      const { renderSuccessUI } = this
      const {
         getMyRideRequestAPIStatus,
         getMyRideRequestAPIError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               apiStatus={getMyRideRequestAPIStatus}
               apiError={getMyRideRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowRideRequests }
