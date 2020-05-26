import {action} from 'mobx';
import {create} from 'apisauce';

import {networkCallWithApisauce} from '../../utils/APIUtils';
import {apiMethods} from '../Constants';

class AuthService {
    api;
    constructor(){
        this.api=create({
            baseURL:'https://5ea1a14db9f5ca00166c1f27.mockapi.io/api/'
        });
    }
    //@action.bound
    signInAPI=()=>{
        return networkCallWithApisauce(
            this.api,
            'v1/signin/',
            {},
            apiMethods.get
            );
    }
}
export {AuthService};