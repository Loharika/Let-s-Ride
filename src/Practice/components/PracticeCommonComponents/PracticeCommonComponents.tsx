import React from 'react'
import { observer } from "mobx-react";
import { observable } from "mobx";

import { Button } from '../../../Common/components/Button'
import TextInput from '../../../Common/components/TextInput';

import {validateUserName} from '../../../Common/utils/ValidationUtils'
import { ErrorStyle } from "../../../Authentication/styledComponents/styledComponents";
import { boolean } from "@storybook/addon-knobs";

@observer
class PracticeCommonComponents extends React.Component {
   @observable userName
   @observable userNameValidation!:{showErrorMessage:boolean,errorMessage:string}
   constructor(props){
      super(props);
      this.userName='';
      this.userNameValidation={showErrorMessage:false,errorMessage:''}
   }
   onChangeUserName=(userName:string)=>{
      this.userName=userName
   }
   
   render() {
      return (
         <div className='flex flex-col'>
            <div>
               <TextInput 
            placeholderText={'Username'}
            inputText={this.userName}
            onChange={this.onChangeUserName}
            validate={validateUserName}
            />
            </div>
        <div> 
           
           <Button
            text={'Submit'}
            onClick={() => {
               console.log(this.userName)
            }}
               />
                 </div>

         </div>
      )
   }
}
export { PracticeCommonComponents }
