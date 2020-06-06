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
          baseURL:'https://e7371cdb684d.ngrok.io/'
      })
   }
   signInAPI = (userName, password) => {
      const siva={
         username:userName,
         password:password
      }
      return networkCallWithApisauce(
         this.api,
         'api/lets_ride/user/login/v1/',
         siva,
         apiMethods.post
      )
   }
}
export { AuthService }
