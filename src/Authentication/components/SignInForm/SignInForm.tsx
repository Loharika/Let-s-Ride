import React from 'react'
import { observer } from 'mobx-react'

import {
   FormType,
   FormDashBoard,
   LoginLink,
   LogInPageLink,
   PasswordAlert,
   LogoImageContainer
} from './styledComponents'
import { COMMUTE_DASHBOARD_LOGIN_PAGE } from '../../constants/NavigationalConstants'
import { FormHeading } from '../../styledComponents/styledComponents'

import { InputField } from '../Common/InputField'

import { LogoImage } from '../Common/LogoImage'
import { Button } from '../Common/Button'
import strings from '../../i18n/strings.json'

type SignInFormProps={
         userName:string,
         password:string,
         confirmPassword:string,
         mobileNumber:string,
         choosePassword:string,
         onChangeUserName:(event:any)=>void,
         onChangePassword:(event:any)=>void,
         onChangeMobileNumber:(event:any)=>void,
         onChangeConfirmPassword:(event:any)=>void,
         onSubmit:(event:any)=>void,
         displayError:boolean,
}
@observer
class SignInForm extends React.Component<SignInFormProps> {
   render() {
      const {
         userName,
         password,
         confirmPassword,
         mobileNumber,
         choosePassword,
         onChangeUserName,
         onChangePassword,
         onChangeMobileNumber,
         onChangeConfirmPassword,
         onSubmit,
         displayError
      } = this.props
      return (
         <FormDashBoard>
            <FormType>
               <LogoImageContainer>
                  <LogoImage />
               </LogoImageContainer>
               <FormHeading>{strings.signUpFormHeading}</FormHeading>
               <InputField
                  value={userName}
                  onChange={onChangeUserName}
                  type={'text'}
                  placeholderText={'Username'}
                  displayError={displayError}
                  label={'USERNAME'}
               />
               <InputField
                  value={password}
                  onChange={onChangePassword}
                  type={'password'}
                  placeholderText={'Password'}
                  displayError={displayError}
                  label={'PASSWORD'}
               />
               <InputField
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  type={'password'}
                  placeholderText={'Confirm Password'}
                  displayError={displayError}
                  label={'CONFIRM PASSWORD'}
               />
               <InputField
                  value={mobileNumber}
                  onChange={onChangeMobileNumber}
                  type={'text'}
                  placeholderText={'Mobile Number'}
                  displayError={displayError}
                  label={'MOBILE NUMBER'}
               />
               {choosePassword.length !== 0 ? (
                  <PasswordAlert >
                     {choosePassword}
                  </PasswordAlert>
               ) : (
                  ''
               )}
               <Button buttonText={strings.signUp} onClickFunction={onSubmit} />
               <LoginLink>
                  {strings.logInLink} &nbsp;{' '}
                  <LogInPageLink href={COMMUTE_DASHBOARD_LOGIN_PAGE}>
                     {' '}
                     &nbsp;{strings.logInLinkText}
                  </LogInPageLink>
               </LoginLink>
            </FormType>
         </FormDashBoard>
      )
   }
}
export default SignInForm
