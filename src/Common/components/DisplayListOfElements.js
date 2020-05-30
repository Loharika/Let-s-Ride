import React, { Component } from 'react';
import {observable} from 'mobx';
import { observer } from 'mobx-react'
import {NoOfListItems,ListItemsDisplay,ListItemsCount,ChangeNoOfListItems,Star} from '../styledComponents/styleComponents.js';
import {Typo14SteelHKGroteSkRegular as Text,Label} from '../styleGuides/StyleGuides.js';
import strings from '../i18n/strings.json';

@observer
class DisplayListOfElements extends Component {
    @observable count;
  constructor(){
      super();
      this.count=0;
  }

  handleIncrement = () => {
    const {onChange}=this.props;
    let intialCount=this.count;
    intialCount++;
    if(intialCount>=0){
      this.count=intialCount;
       onChange(intialCount);
    }
  }
  handleDecrement = () => {
    const {onChange}=this.props;
    let intialCount=this.count;
    intialCount--;
    if(intialCount>=0){
      this.count=intialCount
       onChange(intialCount);
    }
  }
  render() {
      const {listData}=this.props;
    return (
      <NoOfListItems>
        <Label>{listData.title} <Star>*</Star></Label>
        <ListItemsDisplay>
            <ChangeNoOfListItems onClick={this.handleIncrement}>{strings.incrementSymbol}</ChangeNoOfListItems>
            <ListItemsCount><Text>{this.count}</Text></ListItemsCount>
            <ChangeNoOfListItems onClick={this.handleDecrement}>{strings.decrementSymbol}</ChangeNoOfListItems>
        </ListItemsDisplay>
      </NoOfListItems>
    )
  }
}

export {DisplayListOfElements};
