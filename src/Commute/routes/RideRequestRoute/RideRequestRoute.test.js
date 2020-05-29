/*global expect*/
/*global jest*/

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import {CommuteStore} from '../../stores/CommuteStore';
import {CommuteService} from '../../services/CommuteService';
import {RideRequestRoute} from './RideRequestRoute.js';

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

describe("RideRequestRoute Tests", () => {
    let commuteService;
    let commuteStore;
      beforeEach(() => {
            commuteService = new CommuteService();
            commuteStore = new CommuteStore(commuteService);
      });
    
      afterEach(() => {
        jest.resetAllMocks();
      });
        it("check the submit of the request",()=>{
            const { getAllByText,getByRole } = render(
              <Router history={createMemoryHistory()}>
                <RideRequestRoute commuteStore={commuteStore} />
              </Router>
            );
            const requestButton = getByRole("button", { name: "REQUEST" });
            expect(requestButton).toBeInTheDocument();
            fireEvent.click(requestButton);
            const mock = jest.fn(() => 'request');
            let requestDetails={a:'name',b:'number'};
            expect(mock(requestDetails)).toBe("request");
            expect(mock).toHaveBeenCalledWith(requestDetails);
            
        });
        it("should submit request on press enter", () => {
            const { getByLabelText, getByRole } = render(
              <Router history={createMemoryHistory()}>
                <RideRequestRoute commuteStore={commuteStore} />
              </Router>
            );
            const from = "hyderabad";
            const to = "kurnool";
        
            let fromField = getByLabelText("FROM*");
            let toField = getByLabelText("TO*");
            let requestButton = getByRole("button", { name: "REQUEST" });
        
            fireEvent.change(fromField, { target: { value: from } });
            fireEvent.change(toField, { target: { value: to } });
            fireEvent.keyPress(requestButton, { key: "Enter", code: "Enter" });
            
          });
          
                
        it("should render signInRoute loading state", async () => {
          const { getByLabelText, getByPlaceholderText, getByRole } = render(
            <Router history={createMemoryHistory()}>
              <RideRequestRoute commuteStore={commuteStore} />
            </Router>
          );
          const from = "test-user";
          const to = "test-password";
      
          let fromField = getByLabelText("FROM*");
          let toField = getByLabelText("TO*");
          let requestButton = getByRole("button", { name: "REQUEST" });
          const mockLoadingPromise = new Promise(function(resolve, reject) {});
          const mockpostRideRequest = jest.fn();
          mockpostRideRequest.mockReturnValue(mockLoadingPromise);
          commuteService.postRideRequest = mockpostRideRequest;
      
          fireEvent.change(fromField, { target: { value: to } });
          fireEvent.change(toField, { target: { value: to } });
          fireEvent.click(requestButton);
          
        });
        
        it("it should check increment and decrement button for seats",()=>{
            const { getByPlaceholderText,getByLabelText, getAllByRole } = render(
              <Router history={createMemoryHistory()}>
                <RideRequestRoute commuteStore={commuteStore} />
              </Router>
            );
            let incrementButton=getAllByRole("button",{name:'+'});
            let decrementButton=getAllByRole("button",{name:'-'});
            // fireEvent.click(incrementButton)
            // const mock = jest.fn(() => {});
            // expect(mock).toBe("request");
            // expect(mock).toHaveBeenCalled();
        });
        

});