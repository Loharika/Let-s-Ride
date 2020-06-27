import React, { Component } from 'react'

class Filter extends Component{
   static defaultProps = {
      width: 25 ,
      height: 25,
      fill: '#00BFFF'
   }

   render() {
      const { width, height, fill } = this.props
      return (
        <svg width={width} height={height} fill={fill} viewBox="0 0 16 16" {...this.props}>
        <path
          fill="#7E858E"
          fillRule="evenodd"
          d="M1 3a1 1 0 011-1h12a1 1 0 010 2H2a1 1 0 01-1-1zm2 5a1 1 0 011-1h8a1 1 0 010 2H4a1 1 0 01-1-1zm3 4a1 1 0 000 2h4a1 1 0 000-2H6z"
          clipRule="evenodd"
        />
      </svg>
        )
    }
 }
 
 export default Filter
 