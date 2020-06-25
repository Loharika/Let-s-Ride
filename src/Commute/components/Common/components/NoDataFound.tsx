import React from 'react'

import { RiAddLine } from 'react-icons/ri'
import {
   NoDataFoundStyle,
   AddButton
} from '../../../styledComponents/styleComponents'
type NoDataFoundProps={
   noOfItems:number
   onClick:(buttonType:string)=>void
   buttonType:string
}
class NoDataFound extends React.Component<NoDataFoundProps> {
   render() {
      const { noOfItems, onClick, buttonType } = this.props
      return (
         <React.Fragment>
            <NoDataFoundStyle>
               {' '}
               No Data Found
               <AddButton
                  noOfItems={noOfItems}
                  onClick={() => onClick(buttonType)}
               >
                  <RiAddLine /> &nbsp;Add {buttonType.toLowerCase()}
               </AddButton>
            </NoDataFoundStyle>
         </React.Fragment>
      )
   }
}
export { NoDataFound }
