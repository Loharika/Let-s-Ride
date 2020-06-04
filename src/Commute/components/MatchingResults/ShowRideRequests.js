import React from 'react'
import { observer } from 'mobx-react'

import strings from '../../i18n/strings.json'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents.js'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

@observer
class ShowRideRequests extends React.Component {
   renderSuccessUI = () => {
      const { tableHeaders, getRequests } = this.props
      const rideRequests = getRequests();

      return (
         <RequestDetailsTable>
            <TableRow key={Math.random()}>
               {tableHeaders.map(eachOne => {
                  return (
                     <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                  )
               })}
            </TableRow>
            {Object.values(rideRequests).map(request => {
               return (
                  <TableRow key={Math.random() + request.id}>
                     <TableCellLeftAligned>
                          { request.acceptedPersonDetails}
                     </TableCellLeftAligned>
                     <TableCellLeftAligned>{request.from}</TableCellLeftAligned>
                     <TableCellLeftAligned>{request.to}</TableCellLeftAligned>
                     <TableCellLeftAligned>
                        {request['startTime'] !== undefined ? (
                           <span>
                              From:{request.startTime.slice(0, 21)} <br />
                              To:{request.endTime.slice(0, 21)}
                           </span>
                        ) : (
                           request.date.slice(0, 21)
                        )}
                     </TableCellLeftAligned>
                     <TableCellAlignedCenter>
                        {request.noOfSeats}
                     </TableCellAlignedCenter>
                     <TableCellAlignedCenter>
                        {request.noOfLuggages}
                     </TableCellAlignedCenter>
                     
                     <TableCellLeftAligned>
                        <StatusButton>+</StatusButton>
                     </TableCellLeftAligned>
                  </TableRow>
               )
            })}
         </RequestDetailsTable>
      )
   }
   render() {
     
      const { renderSuccessUI } = this
      const {
         getMatchingRequestAPIStatus,
         getMatchingRequestAPIError,
         doNetworkCalls
      } = this.props;
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={this.navigateTo}
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