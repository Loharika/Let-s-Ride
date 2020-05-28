
import React from 'react';
import {observable,action} from 'mobx';
import {observer,inject} from 'mobx-react';
import {withRouter,Redirect } from "react-router-dom";

import {LogInForm} from '../../components/LogInForm';
import {endPoints} from '../../constants';

@inject("authStore")
@observer
class LogInPageRoute extends React.Component{
  @observable userName;
  @observable password;
  @observable displayError;
  @observable errorText;
  @observable isSignInClicked;
  constructor(){
    super();
    this.init();
    this.displayError=false;
  }
  
  init=()=>{
      this.userName="";
      this.password="";
      this.errorText="";
  }
    onSubmit=()=>{
        event.preventDefault();
        let {userName,password}=this;
        const {authStore}=this.props;
        if(userName.length!==0 && password.length!==0){
            this.displayError=false;
            if(authStore.userName===userName && authStore.password===password){
                //console.log(this.userName,this.password);
                this.onClickLogInButton(this.userName,this.password);
            }
            else{
                this.errorText='Enter valid details';
            }
        }
        else{
            this.displayError=true;
        };
        
    }
    onChangeUserName=(event)=>{
        this.userName=event.target.value;
        this.displayError=false;
    }
    onChangePassword=(event)=>{
        this.password=event.target.value;
        this.displayError=false;
    }
    
    @action.bound
    async onClickLogInButton(userName,password){
        this.init();
        const {authStore:{userSignUp,userLogIn}}=this.props;
        //console.log(userName,password);
        await userLogIn(userName,password);
        this.isSignInClicked=true;
        const {authStore:{authAPIService}}=this.props;
        
        if(authAPIService){
           this.props.history.push(endPoints.userProfile);
        }
        
    }
    
    render(){
        const {userName,password,onChangeUserName,onChangePassword,errorText,onSubmit,displayError,isSignInClicked}=this;
        return (
            <LogInForm 
            userName={userName} 
            password={password} 
            isSignInClicked={isSignInClicked}  
            onChangeUserName={onChangeUserName} 
            onChangePassword={onChangePassword}
            onSubmit={onSubmit} 
            displayError={displayError}
            errorText={errorText}/>
            );
    }
}
export default withRouter(LogInPageRoute);