import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Menu } from 'semantic-ui-react'
// eslint-disable-next-line no-unused-vars
import {  BrowserRouter as Router, Route, Link, Redirect, withRouter  } from 'react-router-dom'

const menuComponent = (props) => {
  const padding = {
    // paddingRight: 5,
    fontSize: 19
  }
  return (
    <Menu inverted pointing secondary>
      <Link class="item" style={padding} to="/blogs" >blogs</Link>
      <Link class="item" style={padding} to="/users" >users</Link>
      <div class="item" >{props.user.name} logged in <button onClick={() => props.logoutUser()}>logout</button></div>
    </Menu>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: ownProps.user
  }
}

const mapDispatchToProps = {
  logoutUser
}

const connectedMenu = connect(mapStateToProps, mapDispatchToProps)(menuComponent)

export default connectedMenu