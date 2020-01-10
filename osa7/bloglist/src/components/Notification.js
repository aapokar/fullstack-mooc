import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {
  if (message === null || message==='') {
    return null
  }


  return (
    <div className="message">
      {message}
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification