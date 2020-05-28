import React from 'react';
import {observer} from 'mobx-react';

@observer
class ShowAssetTransport extends React.Component{
    render(){
        console.log(this.props.assetRequests.length);
        return (
            <div>ShowAssetTransport</div>
            
            )
    }
}
export {ShowAssetTransport};