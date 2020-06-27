import React from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ErrorStyle } from "../../../Authentication/styledComponents/styledComponents";

interface TextInputProps{
    inputText:string
    onChange:(userName:string)=>void
    placeholderText:string
    validate:(userInput:string)=>{ showErrorMessage: boolean; errorMessage: string}
}
@observer
class TextInput extends React.Component<TextInputProps>{
    @observable userNameValidation!:{showErrorMessage:boolean,errorMessage:string}
    constructor(props){
       super(props);
       this.userNameValidation={showErrorMessage:false,errorMessage:''}
    }
    onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {onChange}=this.props
        onChange(e.target.value)
    }
    onBlur=(e:React.ChangeEvent<HTMLInputElement>)=>{
        this.userNameValidation=this.props.validate(e.target.value)
    }
     displayError=()=>{
        const {showErrorMessage,errorMessage}=this.userNameValidation
        return showErrorMessage?<ErrorStyle isError={showErrorMessage}>{errorMessage}</ErrorStyle>:''
  
     }
    render(){
        const {inputText,placeholderText}=this.props
        return (
            <React.Fragment>
            <input className='border-2 p-4' 
            defaultValue={inputText} 
            onChange={this.onChange} 
            onBlur={this.onBlur}
            type='text' 
            placeholder={placeholderText}/>
            {this.displayError()}
            </React.Fragment>
        )
    }
}
export default TextInput;
