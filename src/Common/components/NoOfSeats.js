import React, { Component } from 'react';
import {observable} from 'mobx';
import { observer, inject } from 'mobx-react'
import {NoOfSeatsStyle,SeatsDisplay,Seats,ChangeNoOfSeats} from '../styledComponents/styleComponents.js';
import {Typo14SteelHKGroteSkRegular as Text,Typo12HKGroteskSemiBoldSteel,Label} from '../styleGuides/StyleGuides.js';
@observer
class NoOfSeats extends Component {
    @observable seats;
  constructor(){
      super();
      this.seats=4;
  }

  handleIncrement = () => {
    this.seats++;
  }

  handleDecrement = () => {
    this.seats--;
  }

  render() {
    return (
      <NoOfSeatsStyle>
        <Label>NO OF SEATS : </Label>
        <SeatsDisplay>
            <ChangeNoOfSeats onClick={this.handleIncrement}><Text>+</Text></ChangeNoOfSeats>
            <Seats><Text>{this.seats}</Text></Seats>
            <ChangeNoOfSeats onClick={this.handleDecrement}><Text>-</Text></ChangeNoOfSeats>
        </SeatsDisplay>
      </NoOfSeatsStyle>
    )
  }
}

export {NoOfSeats};
