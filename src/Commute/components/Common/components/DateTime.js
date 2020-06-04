import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { RiCalendarLine } from 'react-icons/ri'

import {
   DateAndTimeStyle,
   DataAndTimeDisplay,
   Star,
   ErrorStyle,
   Icon
} from '../../../styledComponents/styleComponents.js'
import { Label } from '../../../styleGuides/StyleGuides.js'

@observer
class DateAndTime extends React.Component {
   @observable isChanged
   @observable startDate
   constructor() {
      super()
      this.startDate = new Date()
      this.isChanged = false
   }

   handleChange = date => {
      this.isChanged = true
      const { onChangeTime } = this.props
      this.startDate = date
      onChangeTime(date)
   }

   render() {
      const { displayError } = this.props
      const dateTo = [
         {
            key: 'date and time',
            text: 'Select Date and Time',
            value: 'date ans time',
            content: (
               <DatePicker
                  selected={this.startDate}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={1}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm aa'
               />
            )
         }
      ]

      return (
         <DateAndTimeStyle>
            <Label>
               {this.props.label}
               <Star>*</Star>
            </Label>
            <DataAndTimeDisplay>
               <Icon>
                  <RiCalendarLine />
               </Icon>

               <DatePicker
                  selected={this.startDate}
                  onChange={this.handleChange}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={1}
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm aa'
               />
            </DataAndTimeDisplay>
            <ErrorStyle isError={displayError && !this.isChanged}>
               Required
            </ErrorStyle>
         </DateAndTimeStyle>
      )
   }
}
export { DateAndTime }
