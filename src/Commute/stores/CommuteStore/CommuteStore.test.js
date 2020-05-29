/*global jest*/
/*global expect*/
/* Mocking js-cookie library */
import Cookie from "js-cookie";

import { API_INITIAL,API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import allRequestsData from '../../fixtures/allRequests.fixture.json';

import {CommuteStore} from "./CommuteStore.js";
import {CommuteService} from '../../services/CommuteService';


let mockSetCookie = jest.fn();
let mockRemoveCookie = jest.fn();

Cookie.set = mockSetCookie;
Cookie.remove = mockRemoveCookie;


describe("ProductStore Tests", () => {
  let commuteService;
  let commuteStore;

  beforeEach(() => {
     commuteService= new CommuteService();
    commuteStore = new CommuteStore(commuteService);
  });
  it("should test initialising product store", () => {
        expect(commuteStore.getRequestAPIStatus).toBe(API_INITIAL);
        expect(commuteStore.getRequestAPIError).toBeNull();
        expect(commuteStore.getRequestAPIResponse).toBe(commuteService);
        expect(commuteStore.commuteService).toBe(commuteService);
  });
  it("should test postRideRequest data fetching state", () => {
        const mockLoadingPromise = new Promise(function (resolve, reject) {});
        const mockPostRideRequest = jest.fn();
        mockPostRideRequest.mockReturnValue(mockLoadingPromise);
        commuteService.postRideRequest = mockPostRideRequest;
        commuteStore.postRideRequest();
        expect(commuteStore.getRequestAPIStatus).toBe(API_FETCHING);
        expect(commuteStore.getRequestAPIError).toBe(null);
    });
    
    it("it should test postRideRequest failure state", async () => {
        const mockFailurePromise = new Promise(function(resolve, reject) {
          reject(new Error("error"));
        }).catch(() => {});
        const mockpostRideRequest = jest.fn();
        mockpostRideRequest.mockReturnValue(mockFailurePromise);
        commuteService.postRideRequest = mockpostRideRequest;
        commuteStore.postRideRequest();
        mockFailurePromise.catch(e => {
            expect(commuteStore.getRequestAPIError).toBe(API_FAILED);
        });
    });
    
    it("should test postRideRequest success state", async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
        resolve(allRequestsData);
      });
      const mockPostRideRequest = jest.fn();

      mockPostRideRequest.mockReturnValue(mockSuccessPromise);
      commuteService.postRideRequest = mockPostRideRequest;
  
      await commuteStore.postRideRequest();

      expect(commuteStore.getRequestAPIStatus).toBe(API_SUCCESS);
      expect(commuteStore.getRequestAPIError).toBe(null);
  });
  it("it should check the function setGetRequestAPIStatus",()=>{
    commuteStore.setGetRequestAPIStatus('success');
    expect(commuteStore.getRequestAPIStatus).toBe('success');
  });
  it("it should check the function setGetRequestAPIError",()=>{
    commuteStore.setGetRequestAPIError('failure');
    expect(commuteStore.getRequestAPIError).toBe('failure');
  });
  it("it should check the function clearRequestAPI",()=>{
    commuteStore.clearRequestAPI();
    expect(commuteStore.getRequestAPIStatus).toBe(API_INITIAL);
    expect(commuteStore.getRequestAPIError).toBeNull();
  })
    
});