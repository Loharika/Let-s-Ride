import React from 'react'
import { observer } from 'mobx-react'
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

type PaginationUIProps={
   pageNumber:number
   totalNumberOfPages:number
   onChangePageNumber:(event: any, data: any) => void
}
@observer
class PaginationUI extends React.Component <PaginationUIProps>{
   constructor(props) {
      super(props)
   }
   render() {
      const { pageNumber, totalNumberOfPages, onChangePageNumber } = this.props
      return (
         <Pagination
            boundaryRange={0}
            defaultActivePage={pageNumber}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalNumberOfPages}
            onPageChange={onChangePageNumber}
         />
      )
   }
}
export { PaginationUI }
