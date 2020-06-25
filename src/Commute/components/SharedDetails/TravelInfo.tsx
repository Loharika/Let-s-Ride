import React from 'react'
import { observer } from 'mobx-react'

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
type TravelInfoTableProps={
   getTravelDetails:()=>[]
   addShareButton:(shareType:string)=>void
   shareType :string
   getTravelInfoAPIStatus:number,
   getTravelInfoAPIError:string,
   doNetworkCalls:()=>void
}
type TravelInfo={
   origin:string,
   destination:string,
   flexibleWithTime:boolean,
   startDatetime:string,
   endDatetime:string,
   dateTime:string,
   travelMedium:string,
   assetsQuantity:number,
   status:string
}

@observer
class TravelInfoTable extends React.Component<TravelInfoTableProps>{
   shareTravelInfoHeaders:string[]
   constructor(props) {
      super(props)
      this.shareTravelInfoHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'TRAVEL MEDIUM',
         'ASSETS QUANTITY',
         'STATUS'
      ]
   }
   renderSuccessUI = () => {
      const { getTravelDetails, addShareButton, shareType } = this.props
      const travelInfo = getTravelDetails()
      if (travelInfo.length !== 0) {
         return (
            <RequestDetailsTable>
               <TableRow key={Math.random()}>
                  {this.shareTravelInfoHeaders.map(eachOne => {
                     return (
                        <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(travelInfo).map((travelInfo:TravelInfo) => {
                  return (
                     <TableRow key={Math.random()}>
                        <TableCellLeftAligned>
                           {travelInfo.origin}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {travelInfo.destination}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {travelInfo.flexibleWithTime ? (
                              <span>
                                 From:{travelInfo.startDatetime.slice(0, 21)} <br />
                                 To:{travelInfo.endDatetime.slice(0, 21)}
                              </span>
                           ) : (
                              travelInfo.dateTime.slice(0, 21)
                           )}
                        </TableCellLeftAligned>
                        <TableCellAlignedCenter>
                           {travelInfo.travelMedium}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {travelInfo.assetsQuantity}
                        </TableCellAlignedCenter>
                        <TableCellLeftAligned>
                           <StatusButton status={travelInfo.status}>
                              {travelInfo.status.toUpperCase()}
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
               noOfItems={travelInfo.length}
               onClick={addShareButton}
               buttonType={shareType}
            />
         )
      }
   }
   render() {
      const { renderSuccessUI } = this
      const {
         getTravelInfoAPIStatus,
         getTravelInfoAPIError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={Math.random()}
               apiStatus={getTravelInfoAPIStatus}
               apiError={getTravelInfoAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { TravelInfoTable }
