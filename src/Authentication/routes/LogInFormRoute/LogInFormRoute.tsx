import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { withRouter, Redirect, RouteComponentProps } from 'react-router-dom'

import { LogInForm } from '../../components/LogInForm'

import { goToDashboardHomePage } from '../../utils/NavigationalUtils'
import { AuthStore } from '../../stores'

interface InjectedProps extends RouteComponentProps {}
interface LogInPageRouteProps extends RouteComponentProps {
   authStore: AuthStore
   goToDashboardHomePage: () => {}
}
@inject('authStore')
@observer
class LogInPageRoute extends React.Component<LogInPageRouteProps> {
   @observable userName
   @observable password
   @observable displayError
   @observable errorText
   @observable userNameErrorText
   constructor(props) {
      super(props)
      this.init()
      this.displayError = false
   }

   init = () => {
      this.userName = ''
      this.password = ''
      this.errorText = ''
   }
   onSubmit = (event: any) => {
      event.preventDefault()
      let { userName, password } = this
      if (userName.length !== 0 && password.length !== 0) {
         this.displayError = false
         this.onClickLogInButton(this.userName, this.password)
      } else {
         this.displayError = true
      }
   }
   onChangeUserName = (event: any) => {
      this.userName = event.target.value
      this.displayError = false
      this.errorText = ''
   }
   onChangePassword = (event: any) => {
      this.password = event.target.value
      this.displayError = false
      this.errorText = ''
   }
   getInjectedProps = () => this.props as InjectedProps
   @action.bound
   async onClickLogInButton(userName: string, password: string) {
      this.init()
      const {
         authStore: { userLogIn }
      } = this.props
      await userLogIn(userName, password)
      const {
         authStore: { access_token }
      } = this.props
      if (access_token) {
         const { history } = this.getInjectedProps()
         goToDashboardHomePage(history)
      }
   }

   render() {
      let {
         userName,
         password,
         onChangeUserName,
         onChangePassword,
         errorText,
         onSubmit,
         displayError
      } = this
      return (
         <LogInForm
            userName={userName}
            password={password}
            onChangeUserName={onChangeUserName}
            onChangePassword={onChangePassword}
            onSubmit={onSubmit}
            displayError={displayError}
            errorText={errorText}
         />
      )
   }
}
export default withRouter(LogInPageRoute)
