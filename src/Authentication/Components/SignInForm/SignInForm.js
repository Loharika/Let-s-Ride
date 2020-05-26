
import React from 'react';
import {observer} from 'mobx-react';

import {FormType,FormDashBoard,FormHeading,SignUpButton,LoginLink,LogInPageLink,PasswordAlert} from './styledComponents.js';
import {InputField,LogoImage} from '../../../Common/Components';
import strings from '../../i18n/strings.json';

@observer
class SignInForm extends React.Component{
    render(){
        const {userName,
                password,
                confirmPassword,
                mobileNumber,
                choosePassword,
                onChangeUserName,
                onChangePassword,
                onChangeMobileNumber,
                onChangeConfirmPassword,
                onSubmit,
                displayError}=this.props;
        return (
            <FormDashBoard>
                <FormType >
                <LogoImage />
                    <FormHeading >{strings.formHeading}</FormHeading>
                    <InputField value={userName} onChange={onChangeUserName} type={'text'} placeholderText={'Username'} displayError={displayError}/>
                    <InputField value={password} onChange={onChangePassword} type={'password'} placeholderText={'Password'} displayError={displayError}/>
                    <InputField value={confirmPassword} onChange={onChangeConfirmPassword} type={'password'} placeholderText={'Confirm Password'} displayError={displayError}/>
                    <InputField value={mobileNumber} onChange={onChangeMobileNumber} type={'text'} placeholderText={'Mobile Number'} displayError={displayError}/>
                    {choosePassword.length!==0?<PasswordAlert clasName='text'>{choosePassword}</PasswordAlert>:''}
                    <SignUpButton onClick={onSubmit} type='button'>
                    {strings.signUp}
                    </SignUpButton>
                    <LoginLink>{strings.logInLink}  &nbsp; <LogInPageLink href="/login-page">  &nbsp;{strings.logInLinkText}</LogInPageLink></LoginLink>
                </FormType>
            </FormDashBoard>
            );
    }
}
export default SignInForm;