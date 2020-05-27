import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';
import {Label } from '../styleGuides/StyleGuides.js';
import {Dropdown,DropdownList,DropdownListOption} from '../styledComponents/styleComponents.js';
@observer
class DisplayDropDown extends React.Component{
   @observable isDropDown;
    constructor(props){
        super(props);
        this.isDropDown=false;
    }
    @action.bound
    onChange(){
        this.isDropDown=!this.isDropDown;
    }
    render(){
        const {data}=this.props;
    return (
        <Dropdown >
            <Label>{data.ListTitle}</Label>
            <DropdownList onChange={this.onChange}>
            <DropdownListOption ></DropdownListOption>
            {data.listItems.map(eachItem=><DropdownListOption key={eachItem} >{eachItem}</DropdownListOption>)}
            </DropdownList>
        </Dropdown> 
            
            );
    }
}
export {DisplayDropDown};

//<DropDownList isDropDown={this.isDropDown} >
// </DropDownList>