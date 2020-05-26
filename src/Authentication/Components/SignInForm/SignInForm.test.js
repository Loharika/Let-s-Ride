/*global expect*/

import React from "react";

import { render } from "@testing-library/react";

import SignInForm from ".";

describe("SignInForm", () => {
  it("should render typed username", () => {
    const username = "test-user";
    const { getByPlaceholderText } = render(
      <SignInForm userName={username} onChangeUserName={()=>{}}/>
    );

    const usernameField = getByPlaceholderText("Username");

    expect(usernameField.value).toBe(username);
  });
  
   it("should render typed password", () => {
    const password = "test-password";
    const { getByPlaceholderText } = render(
      <SignInForm password={password} onChangePassword={() => {}} />
    );
    const passwordField = getByPlaceholderText("Password");

   
    expect(passwordField.value).toBe(password);
  });
  
    it("should render given error message for Enter the details", () => {
    const { getByText } = render(
      <SignInForm displayErrorText='Enter the details' displayError='true'/>
    );
    getByText(/Enter the details/i);
  });
  
});
