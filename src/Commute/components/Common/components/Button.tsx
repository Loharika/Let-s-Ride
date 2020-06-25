import React from 'react'
import { observer } from 'mobx-react'
import { ButtonStyle } from '../../../styledComponents/styleComponents'

type ButtonProps={
   onClickFunction:(event:any)=>void,
   buttonText:string
}
@observer
class Button extends React.Component<ButtonProps> {
   render() {
      const { onClickFunction, buttonText } = this.props
      return <ButtonStyle onClick={onClickFunction}>{buttonText}</ButtonStyle>
   }
}
export { Button }
