import userDetails from '../Authentication/Fixtures/index.fixture.json';

import CounterStore from './CounterStore';
import {AuthStore} from '../Authentication/Stores';
import {AuthService} from '../Authentication/Services';
const counterStore = new CounterStore();
const authService=new AuthService();
const authStore =new AuthStore(authService,userDetails);
export default {
  counterStore,
  authStore,
};
