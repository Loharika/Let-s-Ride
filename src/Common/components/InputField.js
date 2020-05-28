import React from 'react';
import {observer} from 'mobx-react';
import {Label,ErrorStyle,InputTag,InputFieldWithLabel,} from '../styleGuides/StyleGuides.js';
import strings from '../../Authentication/i18n/strings.json';

@observer
class InputField extends React.Component{
    
    render(){
    const {onChange,placeholderText,value,type,displayError,label}=this.props;
    return (
        <InputFieldWithLabel>
            <Label>{label}</Label>
            <InputTag  onChange={onChange}  type={type} placeholder={placeholderText}/>
            <ErrorStyle isError={(value.length===0 && displayError)?true:false} >{strings.required}</ErrorStyle>
        </InputFieldWithLabel>
        );
    }
}
export {InputField};