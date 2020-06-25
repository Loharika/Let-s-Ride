import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import {
   NoOfListItems,
   ListItemsDisplay,
   ListItemsCount,
   ChangeNoOfListItems,
   Star,
   ErrorStyle
} from '../../../styledComponents/styleComponents'
import {
   Typo14SteelHKGroteSkRegular as Text,
   Label
} from '../../../styleGuides/StyleGuides'
type DisplayListOfElementsProps={
   intial:number,
   onChange:(count:number)=>void,
   listData:{
      title:string,
   },
   displayError:boolean
}
@observer
class DisplayListOfElements extends Component<DisplayListOfElementsProps>{
   @observable count:number
   constructor(props) {
      super(props)
      this.count = this.props.intial
   }

   handleIncrement = () => {
      const { onChange } = this.props
      let intialCount = this.count
      intialCount++
      if (intialCount >= 0) {
         this.count = intialCount
         onChange(intialCount)
      }
   }
   handleDecrement = () => {
      const { onChange } = this.props
      let intialCount = this.count
      intialCount--
      if (intialCount >= 0) {
         this.count = intialCount
         onChange(intialCount)
      }
   }
   render() {
      const { listData, displayError,intial } = this.props
      return (
         <React.Fragment>
            <NoOfListItems>
               <Label>
                  {listData.title} <Star>*</Star>
               </Label>
               <ListItemsDisplay>
                  <ChangeNoOfListItems
                     onClick={this.handleDecrement}
                     data-testid={
                        'decrement-button ' + listData.title.toLowerCase()
                     }
                  >
                     -
                  </ChangeNoOfListItems>
                  <ListItemsCount>
                     <Text data-testid={listData.title.toLowerCase()}>
                        {this.props.intial}
                     </Text>
                  </ListItemsCount>
                  <ChangeNoOfListItems
                     onClick={this.handleIncrement}
                     data-testid={
                        'increment-button ' + listData.title.toLowerCase()
                     }
                  >
                     +
                  </ChangeNoOfListItems>
               </ListItemsDisplay>
            </NoOfListItems>
            <ErrorStyle
               isError={displayError && intial === 0 ? true : false}
            >
               Select number {listData.title.slice(6).toLowerCase()}
            </ErrorStyle>
         </React.Fragment>
      )
   }
}

export { DisplayListOfElements }
