import React from 'react';
import {observer} from 'mobx-react';
import {InputField,LogoImage} from '../../../Common/Components';
import strings from '../../i18n/strings.json';

import {FormType,FormDashBoard,FormHeading,SignUpButton as LogInButton,SignUpPageLink,
    LoginLink as SignUpLink,LogInDetailsAlert} from './styledComponents.js';

@observer
class LogInForm extends React.Component{
    render(){
        const {userName,
                password,
                onChangeUserName,
                onChangePassword,
                onSubmit,
                displayError,
                errorText,
        }=this.props;
        return (
            <FormDashBoard>
                <FormType >
                    <LogoImage />
                    <FormHeading >{strings.logInFormHeading}</FormHeading>
                    <InputField value={userName} onChange={onChangeUserName} type={'text'} placeholderText={'Username'} displayError={displayError}/>
                    <InputField value={password} onChange={onChangePassword} type={'password'} placeholderText={'Password'}  displayError={displayError} />
                    <LogInButton onClick={onSubmit} type='button'>
                    {strings.logIn}
                    </LogInButton>
                    {errorText.length!==0?<LogInDetailsAlert>{errorText}</LogInDetailsAlert>:''}
                    <SignUpLink>{strings.signUpLink}  &nbsp; <SignUpPageLink href='/'>  &nbsp;{strings.signUpLinkText}</SignUpPageLink></SignUpLink>
                </FormType>
            </FormDashBoard>
            );
    }
}
export {LogInForm};