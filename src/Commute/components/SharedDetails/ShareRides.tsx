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
import { SharedRides } from '../../stores/Models/SharedDetailsModels'
import { getUniqueKey } from '../../../Common/utils/TestUtils'
type SharedRidesTableProps = {
   getShares: () => Array<SharedRides>
   addShareButton: (shareType: string) => void
   shareType: string
   getSharedRidesStatus: number
   getSharedRidesError: string
   doNetworkCalls: () => void
}
type RideShare = {
   origin: string
   destination: string
   flexibleWithTime: boolean
   startDatetime: string
   endDatetime: string
   dateTime: string
   noOfSeats: number
   assetsQuantity: number
   status: string
}
@observer
class SharedRidesTable extends React.Component<SharedRidesTableProps> {
   sharedRidesHeaders: string[]
   constructor(props) {
      super(props)
      this.sharedRidesHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NO OF SEATS',
         'ASSETS QUANTITY',
         'STATUS'
      ]
   }
   renderSuccessUI = () => {
      const { getShares, addShareButton, shareType } = this.props
      const sharesRides: SharedRides[] = getShares()
      if (sharesRides.length !== 0) {
         return (
            <RequestDetailsTable>
               <TableRow>
                  {this.sharedRidesHeaders.map(eachOne => {
                     return (
                        <TableHeader key={getUniqueKey()}>
                           {eachOne}
                        </TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(sharesRides).map((ride: RideShare) => {
                  return (
                     <TableRow key={getUniqueKey()}>
                        <TableCellLeftAligned>
                           {ride.origin}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {ride.destination}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {ride.flexibleWithTime ? (
                              <span>
                                 From:{ride.startDatetime.slice(0, 21)} <br />
                                 To:{ride.endDatetime.slice(0, 21)}
                              </span>
                           ) : (
                              ride.dateTime.slice(0, 21)
                           )}
                        </TableCellLeftAligned>
                        <TableCellAlignedCenter>
                           {ride.noOfSeats}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {ride.assetsQuantity}
                        </TableCellAlignedCenter>
                        <TableCellLeftAligned>
                           <StatusButton status={ride.status}>
                              {ride.status.toUpperCase()}
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
               noOfItems={sharesRides.length}
               onClick={addShareButton}
               buttonType={shareType}
            />
         )
      }
   }
   render() {
      const { renderSuccessUI } = this
      const {
         getSharedRidesStatus,
         getSharedRidesError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               apiStatus={getSharedRidesStatus}
               apiError={getSharedRidesError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { SharedRidesTable }
