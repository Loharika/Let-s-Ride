import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';
import {Label } from '../styleGuides/StyleGuides.js';
import {Dropdown as DropdownAs,DropdownList,DropdownListOption,Star} from '../styledComponents/styleComponents.js';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
@observer
class DisplayDropDown extends React.Component{
    @action.bound
    onChange(event,data){
        const {onChange}=this.props;
        onChange(data.value);
    }
    onChangeTo=(event,data)=>{
        console.log(data.value);
    }
    render(){
        const {data}=this.props;
        const {onChange}=this;
    return (
        <DropdownAs >
        <Label>{data.ListTitle}<Star>*</Star></Label>
                <Dropdown 
                placeholder='Select Asset Type'
                selection
                options={data.listItems2}
                onChange={this.onChange}
                    />
        </DropdownAs> 
            
            );
    }
}
export {DisplayDropDown};
