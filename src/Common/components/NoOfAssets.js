import React, { Component } from 'react';
import {observable} from 'mobx';
import { observer } from 'mobx-react'
import {NoOfSeatsStyle as NoOfLuggagesStyle,SeatsDisplay as LuggagesDisplay,Seats as Luggages,ChangeNoOfSeats} from '../styledComponents/styleComponents.js';
import {Typo14SteelHKGroteSkRegular as Text,Label} from '../styleGuides/StyleGuides.js';
@observer
class NoOfAssets extends Component {
    @observable assets;
  constructor(){
      super();
      this.assets=4;
  }

  handleIncrement = () => {
    this.assets++;
  }

  handleDecrement = () => {
    this.assets--;
  }

  render() {
    return (
      <NoOfLuggagesStyle>
        <Label>NO OF ASSETS : </Label>
        <LuggagesDisplay>
            <ChangeNoOfSeats onClick={this.handleIncrement}><Text>+</Text></ChangeNoOfSeats>
            <Luggages><Text>{this.assets}</Text></Luggages>
            <ChangeNoOfSeats onClick={this.handleDecrement}><Text>-</Text></ChangeNoOfSeats>
        </LuggagesDisplay>
      </NoOfLuggagesStyle>
    )
  }
}

export {NoOfAssets};
