import React from 'react'
import { observer } from 'mobx-react'
import { Label } from '../../styleGuides/StyleGuides'
import {
   ErrorSymbol,
   InputFiledWithError,
   InputTag,
   InputFieldWithLabel,
   ErrorStyle,
   Star
} from '../../styledComponents/styledComponents'

import { MdErrorOutline } from 'react-icons/md'


type InputFieldProps={
   onChange: (event:any) => void,
   placeholderText : string,
   value:string,
   displayError:boolean,
   label:string,
   type:string

}
@observer
class InputField extends React.Component<InputFieldProps>{
   render() {
      const {
         onChange,
         placeholderText,
         value,
         type,
         displayError,
         label
      } = this.props
      return (
         <InputFieldWithLabel>
            <Label htmlFor={label}>
               {label}
               <Star>*</Star>
            </Label>
            <InputFiledWithError>
               <InputTag
                  id={label}
                  value={value}
                  isError={value.length === 0 && displayError ? true : false}
                  onChange={onChange}
                  type={type}
                  placeholder={placeholderText}
               />
               <ErrorSymbol
                  value={value}
                  isError={value.length === 0 && displayError ? true : false}
               >
                  <MdErrorOutline />
               </ErrorSymbol>
            </InputFiledWithError>
            <ErrorStyle
               isError={value.length === 0 && displayError ? true : false}
            >
               Required
            </ErrorStyle>
         </InputFieldWithLabel>
      )
   }
}
export { InputField }