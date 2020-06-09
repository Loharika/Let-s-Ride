import { action } from 'mobx';

import getUserSignUpResponse from '../../fixtures/getUserSignUpResponse.json'

class AuthService {
   
   signInAPI = (userName, password) => {
     console.log(userName,password)
           return new Promise(resolve => {
                resolve(getUserSignUpResponse)
                 })
   }
   @action.bound
   getProfileDetailsAPI() {
       let Details={
           name:'Loharika',
           gender:'female',
       }
       return new Promise(resolve => {
                resolve(Details);
            });
       
   }
}
export { AuthService }
