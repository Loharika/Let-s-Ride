import React from 'react'
import { observer } from 'mobx-react'
import { InputField } from '../Common/InputField'
import { LogoImage } from '../Common/LogoImage'
import strings from '../../i18n/strings.json'
import { Button } from '../Common/Button'

import { COMMUTE_DASHBOARD_SIGNUP_PAGE } from '../../constants/NavigationalConstants'
import {
   FormType,
   FormDashBoard,
   FormHeading,
   SignUpPageLink,
   LoginLink as SignUpLink,
   LogInDetailsAlert,
   LogoImageContainer
} from './styledComponents'

type LogInFormProps={
         userName:string,
         password:string,
         onChangeUserName:(event:any)=>void,
         onChangePassword:(event:any)=>void,
         onSubmit:(event:any)=>void,
         displayError:boolean,
         errorText:string,
}
@observer
class LogInForm extends React.Component<LogInFormProps> {
   render() {
      const {
         userName,
         password,
         onChangeUserName,
         onChangePassword,
         onSubmit,
         displayError,
         errorText
      } = this.props
      return (
         <FormDashBoard>
            <FormType>
               <LogoImageContainer>
                  <LogoImage />
               </LogoImageContainer>
               <FormHeading>{strings.logInFormHeading}</FormHeading>
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
               {errorText.length !== 0 ? (
                  <LogInDetailsAlert>{errorText}</LogInDetailsAlert>
               ) : (
                  ''
               )}
               <Button buttonText={strings.logIn} onClickFunction={onSubmit} />
               <SignUpLink>
                  {strings.signUpLink} &nbsp;{' '}
                  <SignUpPageLink href={COMMUTE_DASHBOARD_SIGNUP_PAGE}>
                     {' '}
                     &nbsp;{strings.signUpLinkText}
                  </SignUpPageLink>
               </SignUpLink>
            </FormType>
         </FormDashBoard>
      )
   }
}
export { LogInForm }
