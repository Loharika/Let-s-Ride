import React from 'react';
import {observer} from 'mobx-react';
import {Label,} from '../styleGuides/StyleGuides.js';
import {ErrorSymbol,InputFiledWithError,InputTag,InputFieldWithLabel,ErrorStyle} from '../styledComponents/styleComponents.js';
import strings from '../../Authentication/i18n/strings.json';
import {MdErrorOutline} from 'react-icons/md';
@observer
class InputField extends React.Component{
    
    render(){
    const {onChange,placeholderText,value,type,displayError,label}=this.props;
    return (
        <InputFieldWithLabel>
            <Label>{label}</Label>
                <InputFiledWithError>
                <InputTag  value={value}isError={(value.length===0 && displayError)?true:false} onChange={onChange}  type={type} placeholder={placeholderText}/>
                <ErrorSymbol value={value} isError={(value.length===0 && displayError)?true:false}> 
                    <MdErrorOutline />
                </ErrorSymbol>
            </InputFiledWithError >
            <ErrorStyle isError={(value.length===0 && displayError)?true:false} >{strings.required}</ErrorStyle>
        </InputFieldWithLabel>
        );
    }
}
export {InputField};