import React from 'react';
import {observer} from 'mobx-react';
import {Label,ErrorStyle,InputTag} from '../StyleGuides/styleGuides.js';
import strings from '../../Authentication/i18n/strings.json';
@observer
class InputField extends React.Component{
    
    render(){
    const {onChange,placeholderText,value,type,displayError}=this.props;
    //const isErrorMessage=(value.length===0 && displayError)?'true':'false';
    
    return (
        <React.Fragment>
            <Label>{placeholderText.toUpperCase()}</Label>
            <InputTag value={value} onChange={onChange}  type={type} placeholder={placeholderText}/>
            <ErrorStyle isError={(value.length===0 && displayError)?true:false} >{strings.required}</ErrorStyle>
            
        </React.Fragment>
        );
    }
}
export {InputField};

//{(value.length===0 && displayError)?<ErrorStyle >{strings.required}</ErrorStyle>:' '}