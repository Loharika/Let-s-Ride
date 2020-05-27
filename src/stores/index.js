import userDetails from '../Authentication/fixtures/userProfile.fixture.json';

import CounterStore from './CounterStore';
import {AuthStore} from '../Authentication/stores';
import {AuthService} from '../Authentication/services/AuthService';
const counterStore = new CounterStore();
const authService=new AuthService();
const authStore =new AuthStore(authService,userDetails);
export default {
  counterStore,
  authStore,
};
