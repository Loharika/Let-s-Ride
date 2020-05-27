import React, { Component } from 'react';
import {observable} from 'mobx';
import { observer } from 'mobx-react'
import {NoOfListItems,ListItemsDisplay,ListItemsCount,ChangeNoOfListItems} from '../styledComponents/styleComponents.js';
import {Typo14SteelHKGroteSkRegular as Text,Label} from '../styleGuides/StyleGuides.js';
@observer
class DisplayListOfElements extends Component {
    @observable count;
  constructor(){
      super();
      this.count=4;
  }

  handleIncrement = () => {
    this.count++;
  }

  handleDecrement = () => {
    this.count--;
  }

  render() {
      const {listData}=this.props;
    return (
      <NoOfListItems>
        <Label>{listData.title}</Label>
        <ListItemsDisplay>
            <ChangeNoOfListItems onClick={this.handleIncrement}><Text>+</Text></ChangeNoOfListItems>
            <ListItemsCount><Text>{this.count}</Text></ListItemsCount>
            <ChangeNoOfListItems onClick={this.handleDecrement}><Text>-</Text></ChangeNoOfListItems>
        </ListItemsDisplay>
      </NoOfListItems>
    )
  }
}

export {DisplayListOfElements};
