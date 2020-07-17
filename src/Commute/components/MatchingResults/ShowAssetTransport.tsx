import React from 'react'
import { observer } from 'mobx-react'
import { FcCheckmark } from 'react-icons/fc'
import { FiPlus } from 'react-icons/fi'
import { API_SUCCESS } from '@ib/api-constants'
import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import { MatchingAssetRequestCard } from '../../stores/Models/MatchingRequestCard'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton,
   NoDataFound
} from './styledComponents'
import { getUniqueKey } from '../../../Common/utils/TestUtils'
type ShowAssetTransportProps = {
   getRequests: () => Array<MatchingAssetRequestCard>
   tableHeaders: string[]
   doNetworkCalls: () => void
   getMatchingRequestAPIStatus: any
   getMatchingRequestAPIError: any
}

@observer
class ShowAssetTransport extends React.Component<ShowAssetTransportProps> {
   renderSuccessUI = observer(() => {
      const { tableHeaders, getRequests } = this.props
      const assetRequests: Array<MatchingAssetRequestCard> = getRequests()

      if (assetRequests.length !== 0) {
         return (
            <React.Fragment>
               <RequestDetailsTable>
                  <TableRow isHover={false}>
                     {tableHeaders.map(eachOne => {
                        return (
                           <TableHeader key={getUniqueKey()}>
                              {eachOne}
                           </TableHeader>
                        )
                     })}
                  </TableRow>
                  {Object.values(assetRequests).map(
                     (request: MatchingAssetRequestCard) => {
                        return (
                           <TableRow
                              key={getUniqueKey()}
                              onMouseEnter={request.onMouseEnterOnRequest}
                              onMouseLeave={request.onMouseLeaveOnRequest}
                              isHover={request.isHover}
                           >
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
                                    request.datetime.slice(0, 21)
                                 )}
                              </TableCellLeftAligned>
                              <TableCellAlignedCenter>
                                 {request.noOfAssets}
                              </TableCellAlignedCenter>
                              <TableCellAlignedCenter>
                                 {request.assetType}
                              </TableCellAlignedCenter>
                              <TableCellAlignedCenter>
                                 {request.assetSensitivity}
                              </TableCellAlignedCenter>
                              <TableCellAlignedCenter>
                                 {request.whomToDeliver}
                              </TableCellAlignedCenter>
                              <TableCellLeftAligned>
                                 {request.isHover || request.isAdded ? (
                                    <StatusButton
                                       onClick={request.onClickAddButton}
                                       disabled={request.isAdded}
                                    >
                                       {request.isAdded ? (
                                          <FcCheckmark />
                                       ) : (
                                          <FiPlus />
                                       )}
                                    </StatusButton>
                                 ) : (
                                    ''
                                 )}
                              </TableCellLeftAligned>
                           </TableRow>
                        )
                     }
                  )}
               </RequestDetailsTable>
            </React.Fragment>
         )
      } else {
         return <NoDataFound> No Matching Requests Found</NoDataFound>
      }
   })

   render() {
      const { renderSuccessUI } = this
      const {
         getMatchingRequestAPIError,
         getMatchingRequestAPIStatus,
         doNetworkCalls,
         getRequests
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={getRequests().length}
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
