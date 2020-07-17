import React from 'react'
import { observer } from 'mobx-react'
import { RiAddLine } from 'react-icons/ri'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import { NoDataFound as NoDataFoundDisplay } from '../Common/components/NoDataFound'
import { AssetRequestModel } from '../../stores/Models/MyRequestsModels'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents'
import { getUniqueKey } from '../../../Common/utils/TestUtils'

type ShowAssetTransportProps = {
   getRequests: () => Array<AssetRequestModel>
   addRequestButton: (requestType: string) => void
   requestType: string
   getMyAssetRequestAPIStatus: number
   getMyAssetRequestAPIError: string
   doNetworkCalls: () => void
}

@observer
class ShowAssetTransport extends React.Component<ShowAssetTransportProps> {
   tableHeaders: string[]
   constructor(props) {
      super(props)
      this.tableHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NO OF PEOPLE',
         'ASSET TYPE',
         'ASSET SENSITIVITY',
         'WHOM TO DELIVER',
         'ACCEPTED PERSON DETAILS',
         'STATUS'
      ]
   }
   renderSuccessUI = () => {
      const { tableHeaders } = this
      const { getRequests, addRequestButton, requestType } = this.props
      const assetRequests = getRequests()
      if (assetRequests.length !== 0) {
         return (
            <RequestDetailsTable>
               <TableRow>
                  {tableHeaders.map(eachOne => {
                     return (
                        <TableHeader key={getUniqueKey()}>
                           {eachOne}
                        </TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(assetRequests).map(
                  (request: AssetRequestModel) => {
                     return (
                        <TableRow key={getUniqueKey()}>
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
                              {request.assetType}
                           </TableCellAlignedCenter>
                           <TableCellAlignedCenter>
                              {request.assetSensitivity}
                           </TableCellAlignedCenter>
                           <TableCellLeftAligned>
                              {request.whomToDeliver}
                           </TableCellLeftAligned>
                           <TableCellLeftAligned>
                              {request.status === 'CONFIRM' ? (
                                 <span>
                                    {request.acceptedPersonDetails.name}
                                    <br />
                                    {
                                       request.acceptedPersonDetails
                                          .mobile_number
                                    }
                                 </span>
                              ) : request.status === 'PENDING' ? (
                                 'Not Confirmed'
                              ) : (
                                 'EXPIRE'
                              )}
                           </TableCellLeftAligned>

                           <TableCellLeftAligned>
                              <StatusButton
                                 status={request.status.toUpperCase()}
                              >
                                 {request.status.toUpperCase()}
                              </StatusButton>
                           </TableCellLeftAligned>
                        </TableRow>
                     )
                  }
               )}
            </RequestDetailsTable>
         )
      } else {
         return (
            <NoDataFoundDisplay
               noOfItems={assetRequests.length}
               onClick={addRequestButton}
               buttonType={requestType}
            />
         )
      }
   }

   render() {
      const { renderSuccessUI } = this
      const {
         getMyAssetRequestAPIStatus,
         getMyAssetRequestAPIError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               apiStatus={getMyAssetRequestAPIStatus}
               apiError={getMyAssetRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowAssetTransport }
