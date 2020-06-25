import React from 'react'
import { observer } from 'mobx-react'
import { DateAndTime } from './DateTime'
import { FlexibleDateAndTimeStyle } from '../../../styledComponents/styleComponents'
type FlexibleDateTimeProps={
   onChangeFromTime:(time:any)=>void,
   onChangeToTime:(time:any)=>void,
   displayError:boolean,
   
}

@observer
class FlexibleDateTime extends React.Component<FlexibleDateTimeProps> {
   render() {
      const { onChangeFromTime, onChangeToTime, displayError } = this.props
      return (
         <FlexibleDateAndTimeStyle>
            <DateAndTime
               startDate={new Date()}
               label={'FROM'}
               onChangeTime={onChangeFromTime}
               displayError={displayError}
            />
            <DateAndTime
            startDate={new Date()}
               label={'TO'}
               onChangeTime={onChangeToTime}
               displayError={displayError}
            />
         </FlexibleDateAndTimeStyle>
      )
   }
}
export { FlexibleDateTime }
