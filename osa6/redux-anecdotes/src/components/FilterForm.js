import React from 'react'
import {newFilter} from '../reducers/filterReducer'
import { connect } from 'react-redux'


const FilterForm = (props) => {

    const handleChange = (event) => {
        props.newFilter(event.target.value)
    }

    return (
        <div>
            filter:<input type="text" onChange={handleChange} />
        </div>
    )
}

  const mapDispatchToProps = {
    newFilter
  }
  
  const ConnectedFilterForm = connect(null,
    mapDispatchToProps
    )(FilterForm)
  

export default ConnectedFilterForm