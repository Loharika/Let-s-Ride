import React, { Component } from 'react'
import SvgComponent from '../../SvgComponent'
import SvgFile from './SvgFile'

class Filter extends Component {
   render() {
      return <SvgComponent renderComponent={SvgFile} {...this.props} />
   }
}

export default Filter
