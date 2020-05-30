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
    render(){
        const {data}=this.props;
        return (
            <DropdownAs >
            {data.listTitle.length!==0?
                <Label>{data.listTitle}<Star>*</Star></Label>:''
            }
                <Dropdown 
                placeholder={data.placeholder}
                selection
                options={data.listItems}
                onChange={this.onChange}
                    />
        </DropdownAs> 
            
            );
    }
}
export {DisplayDropDown};
