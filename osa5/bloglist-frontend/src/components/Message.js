import React from 'react'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  if (status=== 'message') {
    return (
      <div className="message">
        {message}
      </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )

}

export default Notification