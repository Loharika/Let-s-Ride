/*global expect*/
/*global jest*/

/* Mocking js-cookie library */

import Cookie from 'js-cookie'

import {
   API_INITIAL,
   API_SUCCESS,
   API_FAILED,
   API_FETCHING
} from '@ib/api-constants'

import allRequestsData from '../../fixtures/allRequests.fixture.json'
import assetRequestData from '../../fixtures/assetRequests.fixture.json'
import rideRequestData from '../../fixtures/rideRequests.fixture.json'

import { CommuteStore } from './CommuteStore.js'
import { CommuteService } from '../../services/CommuteService/CommuteService.fixture.js'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('Commute Store Tests', () => {
   let commuteService
   let commuteStore

   beforeEach(() => {
      commuteService = new CommuteService()
      commuteStore = new CommuteStore(commuteService)
   })
   it('should test initialising commuteStore store', () => {
      expect(commuteStore.getRideRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getRideRequestAPIError).toBeNull()
      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getAssetTrasportRequestAPIError).toBeNull()
      expect(commuteStore.getShareRideAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getShareRideAPIError).toBeNull()
      expect(commuteStore.getShareTravelInfoAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getShareTravelInfoAPIError).toBeNull()
      expect(commuteStore.getMyRideRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMyRideRequestAPIError).toBeNull()
      expect(commuteStore.rideRequests).toEqual(expect.any(Array))
      expect(commuteStore.noOfRideRequests).toEqual(0)
      expect(commuteStore.getMyAssetRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMyAssetRequestAPIError).toBeNull()
      expect(commuteStore.assetRequests).toEqual(expect.any(Array))
      expect(commuteStore.noOfAssetRequests).toEqual(0)
      expect(commuteStore.getMatchingRequestAPIStatus).toBe(API_INITIAL)
      expect(commuteStore.getMatchingRequestAPIError).toBeNull()
      expect(commuteStore.matchingRequests).toEqual(expect.any(Array))
      
   })
   it('should test postRideRequest fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.rideRequestAPI = mockPostRideRequest
      commuteStore.postRideRequest()
      expect(commuteStore.getRideRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getRideRequestAPIError).toBe(null)
   })

   it('it should test postRideRequest failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.rideRequest = mockpostRideRequest
      commuteStore.postRideRequest()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getRideRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test postRideRequest success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(allRequestsData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.rideRequestAPI = mockPostRideRequest

      await commuteStore.postRideRequest()

      expect(commuteStore.getRideRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getRideRequestAPIError).toBe(null)
   })
   it('should test postAssetTransportRequest  fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.assetTransportRequestAPI = mockPostRideRequest
      commuteStore.postAssetTransportRequest()
      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getAssetTrasportRequestAPIError).toBe(null)
   })

   it('it should test postAssetTransportRequest failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.assetTransportRequestAPI = mockpostRideRequest
      commuteStore.postAssetTransportRequest()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getAssetTrasportRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test postAssetTransportRequest success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(allRequestsData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.assetTransportRequestAPI = mockPostRideRequest

      await commuteStore.postAssetTransportRequest()

      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getAssetTrasportRequestAPIError).toBe(null)
   })
   it('should test shareRideInfo fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.shareRideInfoAPI = mockPostRideRequest
      commuteStore.shareRideInfo()
      expect(commuteStore.getShareRideAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getShareRideAPIError).toBe(null)
   })

   it('it should test shareRideInfo failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.shareRideInfoAPI = mockpostRideRequest
      commuteStore.shareRideInfo()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getShareRideAPIError).toBe(API_FAILED)
      })
   })

   it('should test shareRideInfo success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(allRequestsData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.shareRideInfoAPI = mockPostRideRequest

      await commuteStore.shareRideInfo()

      expect(commuteStore.getShareRideAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getShareRideAPIError).toBe(null)
   })
   it('should test shareTravelInfo fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.shareTravelInfoAPI = mockPostRideRequest
      commuteStore.shareTravelInfo()
      expect(commuteStore.getShareTravelInfoAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getShareTravelInfoAPIError).toBe(null)
   })

   it('it should test shareTravelInfo failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.shareTravelInfoAPI = mockpostRideRequest
      commuteStore.shareTravelInfo()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getShareTravelInfoAPIError).toBe(API_FAILED)
      })
   })

   it('should test shareTravelInfo success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(allRequestsData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.shareTravelInfoAPI = mockPostRideRequest

      await commuteStore.shareTravelInfo()

      expect(commuteStore.getShareTravelInfoAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getShareTravelInfoAPIError).toBe(null)
   })
   it('should test get MyRide Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.myRideRequestsAPI = mockPostRideRequest
      commuteStore.getMyRideRequests()
      expect(commuteStore.getMyRideRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getMyRideRequestAPIError).toBe(null)
      
   })

   it('it should test  MyRide Requests  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.myRideRequestsAPI = mockpostRideRequest
      commuteStore.getMyRideRequests()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getMyRideRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test  MyRide Requests  success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(rideRequestData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.myRideRequestsAPI = mockPostRideRequest

      await commuteStore.getMyRideRequests()

      expect(commuteStore.getMyRideRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getMyRideRequestAPIError).toBe(null)
      expect(commuteStore.rideRequests).toStrictEqual(rideRequestData.requests);
      expect(commuteStore.noOfRideRequests).toStrictEqual(rideRequestData.requests.length);
      
   })
   it('should test get My Asset Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.myAssetRequestsAPI = mockPostRideRequest
      commuteStore.getMyAssetRequests()
      expect(commuteStore.getMyAssetRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getMyAssetRequestAPIError).toBe(null)
      
   })

   it('it should test  My Asset Requests  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.myAssetRequestsAPI = mockpostRideRequest
      commuteStore.getMyAssetRequests()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getMyAssetRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test  My Asset Requests  success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(assetRequestData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.myAssetRequestsAPI = mockPostRideRequest

      await commuteStore.getMyAssetRequests()

      expect(commuteStore.getMyAssetRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getMyAssetRequestAPIError).toBe(null)
      expect(commuteStore.assetRequests).toEqual(assetRequestData.requests);
      expect(commuteStore.noOfAssetRequests).toBe(assetRequestData.noOfRequests);
      
      
   })
   it('should test get Matching Requests fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockPostRideRequest = jest.fn()
      mockPostRideRequest.mockReturnValue(mockLoadingPromise)
      commuteService.matchingAllRequestsAPI = mockPostRideRequest
      commuteStore.getAllMatchingRequests()
      expect(commuteStore.getMatchingRequestAPIStatus).toBe(API_FETCHING)
      expect(commuteStore.getMatchingRequestAPIError).toBe(null)
      
   })

   it('it should test   get Matching Requests  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockpostRideRequest = jest.fn()
      mockpostRideRequest.mockReturnValue(mockFailurePromise)
      commuteService.matchingAllRequestsAPI = mockpostRideRequest
      commuteStore.getAllMatchingRequests()
      mockFailurePromise.catch(e => {
         expect(commuteStore.getMatchingRequestAPIError).toBe(API_FAILED)
      })
   })

   it('should test  get Matching Requests success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(allRequestsData)
      })
      const mockPostRideRequest = jest.fn()

      mockPostRideRequest.mockReturnValue(mockSuccessPromise)
      commuteService.matchingAllRequestsAPI = mockPostRideRequest

      await commuteStore.getAllMatchingRequests()

      expect(commuteStore.getMatchingRequestAPIStatus).toBe(API_SUCCESS)
      expect(commuteStore.getMatchingRequestAPIError).toBe(null)
      expect(commuteStore.matchingRequests).toEqual(allRequestsData)
      
   })
   
   it('it should check the function setGetRideRequestAPIStatus', () => {
      commuteStore.setGetRideRequestAPIStatus('success')
      expect(commuteStore.getRideRequestAPIStatus).toBe('success')
   })
   it('it should check the function setGetRideRequestAPIError', () => {
      commuteStore.setGetRideRequestAPIError('failure')
      expect(commuteStore.getRideRequestAPIError).toBe('failure')
   })
   it('it should check the function setGetAssetTrasportRequestAPIStatus ', () => {
      commuteStore.setGetAssetTrasportRequestAPIStatus('success')
      expect(commuteStore.getAssetTrasportRequestAPIStatus).toBe('success')
   })
   it('it should check the function setGetAssetTrasportRequestAPIError', () => {
      commuteStore.setGetAssetTrasportRequestAPIError('failure')
      expect(commuteStore.getAssetTrasportRequestAPIError).toBe('failure')
   })
   it('it should check the function setGetShareRideAPIStatus ', () => {
      commuteStore.setGetShareRideAPIStatus('success')
      expect(commuteStore.getShareRideAPIStatus).toBe('success')
   })
   it('it should check the function setGetAssetTrasportRequestAPIError', () => {
      commuteStore.setGetShareRideAPIError('failure')
      expect(commuteStore.getShareRideAPIError).toBe('failure')
   })
   it('it should check the function setGetShareTravelInfoAPIStatus ', () => {
      commuteStore.setGetShareTravelInfoAPIStatus('success')
      expect(commuteStore.getShareTravelInfoAPIStatus).toBe('success')
   })
   it('it should check the function setGetShareTravelInfoAPIError', () => {
      commuteStore.setGetShareTravelInfoAPIError('failure')
      expect(commuteStore.getShareTravelInfoAPIError).toBe('failure')
   })
   it('it should check the function setGetMyRideRequestAPIStatus ', () => {
      commuteStore.setGetMyRideRequestAPIStatus('success')
      expect(commuteStore.getMyRideRequestAPIStatus).toBe('success')
   })
   it('it should check the function setGetMyRideRequestAPIError', () => {
      commuteStore.setGetMyRideRequestAPIError('failure')
      expect(commuteStore.getMyRideRequestAPIError).toBe('failure')
   })
   it('it should check the function setGetMyRideRequestAPIResponse', () => {
      const response={requests:[],noOfRequests:0};
      commuteStore.setGetMyRideRequestAPIResponse(response)
      expect(commuteStore.rideRequests).toStrictEqual(response.requests)
      expect(commuteStore.noOfRideRequests).toBe(response.noOfRequests)
   })
   it('it should check the function setGetMyAssetRequestAPIStatus ', () => {
      commuteStore.setGetMyAssetRequestAPIStatus('success')
      expect(commuteStore.getMyAssetRequestAPIStatus).toBe('success')
   })
   it('it should check the function setGetMyAssetRequestAPIError', () => {
      commuteStore.setGetMyAssetRequestAPIError('failure')
      expect(commuteStore.getMyAssetRequestAPIError).toBe('failure')
   })
   it('it should check the function setGetMyRideRequestAPIResponse', () => {
      const response={requests:[],noOfRequests:0};
      commuteStore.setGetMyRideRequestAPIResponse(response)
      expect(commuteStore.assetRequests).toStrictEqual(response.requests)
      expect(commuteStore.noOfAssetRequests).toBe(response.noOfRequests)
   })
   it('it should check the function setGetMatchingRequestAPIStatus ', () => {
      commuteStore.setGetMatchingRequestAPIStatus('success')
      expect(commuteStore.getMatchingRequestAPIStatus).toBe('success')
   })
   it('it should check the function setGetMatchingRequestAPIError', () => {
      commuteStore.setGetMatchingRequestAPIError('failure')
      expect(commuteStore.getMatchingRequestAPIError).toBe('failure')
   })
   it('it should check the function setGetMatchingRequestAPIResponse', () => {
      const response={requests:[],noOfRequests:0};
      commuteStore.setGetMatchingRequestAPIResponse(response)
      expect(commuteStore.matchingRequests).toStrictEqual(response)
   })
   
})
