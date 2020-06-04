import React from 'react'
import { observer } from 'mobx-react'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents.js'

@observer
class ShowAssetTransport extends React.Component {
   renderSuccessUI = () => {
      const { tableHeaders, getRequests } = this.props
      const assetRequests = getRequests();
      return (
         <RequestDetailsTable>
            <TableRow>
               {tableHeaders.map(eachOne => {
                  return <TableHeader>{eachOne}</TableHeader>
               })}
            </TableRow>
            {Object.values(assetRequests).map(request => {
               return (
                  <TableRow>
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
                        {request.assetType}
                     </TableCellAlignedCenter>
                     <TableCellAlignedCenter>
                        {request.assetSentivity}
                     </TableCellAlignedCenter>
                     
                     <TableCellLeftAligned>
                        <StatusButton >
                           +
                        </StatusButton>
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
         getMatchingRequestAPIError,
         getMatchingRequestAPIStatus,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={Math.random()}
               apiStatus={getMatchingRequestAPIStatus}
               apiError={getMatchingRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowAssetTransport }
