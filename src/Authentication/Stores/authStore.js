import {observable,action} from 'mobx';
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {API_INITIAL} from '@ib/api-constants';
import {getAccessToken,setAccessToken,clearUserSession} from "../../utils/StorageUtils";

class AuthStore{
    @observable getUserSignInAPIStatus;
    @observable getUserSignInAPIError;
    @observable authAPIService;
    authService
    constructor(authService,userDetails){
        this.init();
        this.userName='harika';
        this.password='123';
        this.authService=authService;
        this.userDetails=userDetails;
    }
    @action.bound
    init(){
        this.getUserSignInAPIStatus=API_INITIAL;
        this.getUserSignInAPIError=null;
        this.authAPIService=getAccessToken();
    }
  
    @action.bound
    getUserDetails(){
       return this.userDetails;
    }
         
    @action.bound
    userSignUp(){
        let signInPromise=this.authService.signInAPI();
        return bindPromiseWithOnSuccess(signInPromise).
        to(this.setGetUserSignInAPIStatus,this.setUserSignInAPIResponse).
        catch(this.setGetUserSignInAPIError);
        
    }
     @action.bound
    setUserSignInAPIResponse(signInResponseToken){
        const access_token=signInResponseToken[0].access_token;
        setAccessToken(access_token);
        this.authAPIService=getAccessToken();
    }
     @action.bound
    setGetUserSignInAPIError(apiError){
        this.getUserSignInAPIError=apiError;
    }
     @action.bound
    setGetUserSignInAPIStatus(apiStatus){
        this.getUserSignInAPIStatus=apiStatus;
    }
     @action.bound
    userSignOut(){
        clearUserSession();
        this.init();
    }
}
export {AuthStore};

