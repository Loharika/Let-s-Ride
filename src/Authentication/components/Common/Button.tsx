import React from 'react'
import { observer } from 'mobx-react'
import { ButtonStyle } from '../../styledComponents/styledComponents'


type ButtonProps={
   buttonText: string,
   onClickFunction: (event:any) => void,

}



@observer
class Button extends React.Component<ButtonProps> {
   render() {
      const { onClickFunction, buttonText } = this.props
      return <ButtonStyle onClick={onClickFunction}>{buttonText}</ButtonStyle>
   }
}
export { Button }
