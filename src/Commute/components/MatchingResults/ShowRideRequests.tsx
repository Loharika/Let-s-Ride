import React from 'react'
import { observer } from 'mobx-react'
import { FcCheckmark } from 'react-icons/fc'
import { FiPlus } from 'react-icons/fi'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton,
   NoDataFound
} from './styledComponents'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import { MatchingRideRequestCard } from "../../stores/Models/MatchingRequestCard"
type ShowRideRequestsProps={ 
   getRequests: () => Array<MatchingRideRequestCard>;
    tableHeaders: string[]; doNetworkCalls: () => void; getMatchingRequestAPIStatus: any; getMatchingRequestAPIError: any; }

@observer 
class ShowRideRequests extends React.Component<ShowRideRequestsProps>{
   renderSuccessUI = observer(() => {
      const {
         tableHeaders,
         getRequests
      } = this.props
      const rideRequests:Array<MatchingRideRequestCard> = getRequests()
      if (rideRequests.length !== 0) {
         return (
            <RequestDetailsTable key={Math.random()}>
               <TableRow key={Math.random()}>
                  {tableHeaders.map(eachOne => {
                     return (
                        <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(rideRequests).map((request:MatchingRideRequestCard) => {
                  return (
                     <TableRow key={request.requestedBy.name}>
                        <TableCellLeftAligned>
                           {request.requestedBy.name}
                           <br />
                           {request.requestedBy.mobile_number}
                        </TableCellLeftAligned>
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
                           <StatusButton onClick={request.onClickAddButton} disabled={request.isAdded}>
                              
                              {request.isAdded? <FcCheckmark /> : <FiPlus />}
                           </StatusButton>
                        </TableCellLeftAligned>
                     </TableRow>
                  )
               })}
            </RequestDetailsTable>
         )
      } else {
         return <NoDataFound> No Matching Requests Found</NoDataFound>
      }
   })
   render() {
      const { renderSuccessUI } = this
      const {
         getMatchingRequestAPIStatus,
         getMatchingRequestAPIError,
         doNetworkCalls
      } = this.props

      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               apiStatus={getMatchingRequestAPIStatus}
               apiError={getMatchingRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowRideRequests }
