import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';
import {Label } from '../styleGuides/StyleGuides.js';
import {Dropdown,DropdownList,DropdownListOption} from '../styledComponents/styleComponents.js';
@observer
class DisplayDropDown extends React.Component{
    @action.bound
    onChange(item){
        const {onChange}=this.props;
        onChange(item);
    }
    render(){
        const {data}=this.props;
        const {onChange}=this;
    return (
        <Dropdown >
            <Label>{data.ListTitle}</Label>
            <DropdownList onChange={()=>onChange(event.target.value)}>
            <DropdownListOption ></DropdownListOption>
            {data.listItems.map(eachItem=><DropdownListOption key={eachItem} value={eachItem}>{eachItem}</DropdownListOption>)}
            </DropdownList>
        </Dropdown> 
            
            );
    }
}
export {DisplayDropDown};
