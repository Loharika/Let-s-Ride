import {observable,action} from 'mobx';
import {bindPromiseWithOnSuccess} from '@ib/mobx-promise';
import {API_INITIAL} from '@ib/api-constants';
import {getAccessToken,setAccessToken,clearUserSession} from "../../utils/StorageUtils";

class AuthStore{
    @observable getUserSignInAPIStatus;
    @observable getUserSignInAPIError;
    @observable access_token;
    authService
    constructor(authService){
        this.init();
        this.userName='siva';
        this.password='siva';
        this.authService=authService;
    }
    @action.bound
    init(){
        this.getUserSignInAPIStatus=API_INITIAL;
        this.getUserSignInAPIError=null;
        this.access_token=getAccessToken();
    }
    @action.bound
    userSignUp(){
        let signInPromise=this.authService.signInAPI();
        return bindPromiseWithOnSuccess(signInPromise).
        to(this.setGetUserSignInAPIStatus,this.setUserSignInAPIResponse).
        catch(this.setGetUserSignInAPIError);
        
    }
    @action.bound
    userLogIn(userName,password){
        //console.log("--------input---------");
        //console.log(userName+password);
        let signInPromise=this.authService.signInAPI(userName,password);
        return bindPromiseWithOnSuccess(signInPromise).
        to(this.setGetUserSignInAPIStatus,this.setUserSignInAPIResponse).
        catch(this.setGetUserSignInAPIError);
    }
     @action.bound
    setUserSignInAPIResponse(signInResponse){
        // console.log("---------status----------");
        // console.log(signInResponse);
        const access_token=signInResponse[0].access_token;
        setAccessToken(access_token);
        this.access_token=access_token;
    }
     @action.bound
    setGetUserSignInAPIError(apiError){
        this.getUserSignInAPIError=apiError;
    }
     @action.bound
    setGetUserSignInAPIStatus(apiStatus){
        //console.log("status   "+apiStatus);
        this.getUserSignInAPIStatus=apiStatus;
    }
     @action.bound
    userSignOut(){
        clearUserSession();
        this.init();
    }
}
export {AuthStore};

