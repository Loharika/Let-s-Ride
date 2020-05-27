import React, { Component } from 'react';
import {observable} from 'mobx';
import { observer } from 'mobx-react'
import {NoOfSeatsStyle as NoOfLuggagesStyle,SeatsDisplay as LuggagesDisplay,Seats as Luggages,ChangeNoOfSeats} from '../styledComponents/styleComponents.js';
import {Typo14SteelHKGroteSkRegular as Text,Label} from '../styleGuides/StyleGuides.js';
@observer
class NoOfLuggages extends Component {
    @observable luggages;
  constructor(){
      super();
      this.luggages=4;
  }

  handleIncrement = () => {
    this.luggages++;
  }

  handleDecrement = () => {
    this.luggages--;
  }

  render() {
    return (
      <NoOfLuggagesStyle>
        <Label>NO OF LUGGAGES : </Label>
        <LuggagesDisplay>
            <ChangeNoOfSeats onClick={this.handleIncrement}><Text>+</Text></ChangeNoOfSeats>
            <Luggages><Text>{this.luggages}</Text></Luggages>
            <ChangeNoOfSeats onClick={this.handleDecrement}><Text>-</Text></ChangeNoOfSeats>
        </LuggagesDisplay>
      </NoOfLuggagesStyle>
    )
  }
}

export {NoOfLuggages};
