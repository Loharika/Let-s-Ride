import React from 'react';
import {observable,action} from 'mobx';
import {observer} from 'mobx-react';

import {Header,Title,DropDown,MatchingRequestsDisplay} from './styledComponents.js';

import {DisplayDropDown} from '../../../Common/components/DisplayDropDown.js';

@observer
class MatchingRequests extends React.Component{
    
    @action.bound
    onChangeFilter(filterBy){
        const {onChangeMatchingRequestsFilter}=this.props;
        onChangeMatchingRequestsFilter(filterBy);
    }
    render(){
        const {onChangeFilter}=this;
        const filterOptions={
            listTitle:'',
            listItems:[{key:'ALL',text:'All',value:'ALL'},{key:'RIDE',text:'Ride',value:'RIDE'}
            ,{key:'ASSETS',text:'Assets',value:'ASSETS'},
            ],
            placeholder:'Filter'
        };
        return (
            <MatchingRequestsDisplay>
                <Header>
                    <Title>Matching Requests</Title>
                    <DropDown>
                    <DisplayDropDown data={filterOptions} onChange={onChangeFilter}/>
                    </DropDown>
                </Header>
            </MatchingRequestsDisplay>
            );
    }
}
export {MatchingRequests};