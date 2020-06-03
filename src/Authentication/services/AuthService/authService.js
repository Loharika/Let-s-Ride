import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants.js';
import { EnvironmentConstants } from '../../../Common/constants';
import { endpoints } from '../endpoints.js'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: EnvironmentConstants.BASE_URL
      })
   }
   signInAPI = (userName, password) => {
      //console.log(userName,password);
      const object = {
         username: userName,
         password: password
      }
      return networkCallWithApisauce(
         this.api,
         endpoints.signIn,
         object,
         apiMethods.get
      )
   }
}
export { AuthService }
