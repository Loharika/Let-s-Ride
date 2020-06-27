import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Filter from '../../../../Common/components/common/Icons/Filter' 
import { Label } from '../../../styleGuides/StyleGuides'
import {
   Dropdown as DropdownAs,
   Star,
   ErrorStyle,
   DropdownWithIcon,
   FilterIcon
} from '../../../styledComponents/styleComponents'
type DisplayDropDownProps={
   onChange:(value: string) => void,
   data:{
      listTitle:string,
      placeholder:string,
      listItems:{ key: string; text: string; value: string; }[],
   }, 
   displayError:boolean
}
@observer
class DisplayDropDown extends React.Component<DisplayDropDownProps> {
   @observable isClicked:boolean
   constructor(props) {
      super(props)
      this.isClicked = false
   }
   @action.bound
   onChange(event, data) {
      this.isClicked = true
      const { onChange } = this.props
      onChange(data.value)
   }
   render() {
      const { data,displayError } = this.props
      return (
         <DropdownWithIcon>  
            <FilterIcon> <Filter /></FilterIcon>     
            
         <DropdownAs>
            {data.listTitle.length !== 0 ? (
               <Label htmlFor={data.listTitle.toLowerCase()}>
                  {data.listTitle}
                  <Star>*</Star>
               </Label>
            ) : (
               ''
            )}
            <Dropdown
               id={data.listTitle.toLowerCase()}
               placeholder={data.placeholder}
               selection
               options={data.listItems}
               onChange={this.onChange}
            />
            <ErrorStyle isError={!this.isClicked && displayError}>
               {' '}
               Required
            </ErrorStyle>
         </DropdownAs>
         </DropdownWithIcon>
 
      )
   }
}
export { DisplayDropDown }
