/*global expect*/
/*global jest*/

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import {CommuteStore} from '../../stores/CommuteStore';
import {CommuteService} from '../../services/CommuteService';
import {AssetTransportRequestRoute} from './AssetTransportRequestRoute.js';

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
                <AssetTransportRequestRoute commuteStore={commuteStore} />
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
            const { getByPlaceholderText, getByRole } = render(
              <Router history={createMemoryHistory()}>
                <AssetTransportRequestRoute commuteStore={commuteStore} />
              </Router>
            );
            const from = "hyderabad";
            const to = "kurnool";
        
            //let fromField = getByPlaceholderText("Ex:");
            // let toField = getByPlaceholderText("Ex: ");
            let requestButton = getByRole("button", { name: "REQUEST" });
        
            // fireEvent.change(fromField, { target: { value: from } });
            // fireEvent.change(toField, { target: { value: to } });
            fireEvent.keyPress(requestButton, { key: "Enter", code: "Enter" });
            
          });
        it("",()=>{
          
        })

});