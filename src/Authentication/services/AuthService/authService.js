import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants.js'
import { EnvironmentConstants } from '../../../Common/constants'
import { endpoints } from '../endpoints.js'

class AuthService {
   api
   constructor() {
      this.api = create({
         //baseURL: 'https://f6e5ec5fa37d.ngrok.io'
         baseURL:'https://4015ee346b19.ngrok.io/'
      })
   }
   signInAPI = (userName, password) => {
      //console.log(userName,password);
      console.log(userName,password);
      const object = {
         username: userName,
         password: password
      }
      return networkCallWithApisauce(
         this.api,
         'api/lets_ride/LogIn/v1/',
         object,
         apiMethods.post
      )
   }
}
export { AuthService }
