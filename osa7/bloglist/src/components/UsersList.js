import React from 'react'
import { connect } from 'react-redux'
import {  BrowserRouter as Router, Route, Link, Redirect, withRouter  } from 'react-router-dom'

const UsersList = (props) => {
  return (

    <div>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {props.users
            .map(usr =>
              <tr key={usr.id}>
                <td>
                  <Link to={`/users/${usr.id}`}>{usr.name}</Link>
                </td>
                <td>
                  {usr.blogs.length}
                </td>
              </tr>
            )}
        </tbody>
      </table>

    </div>
  )}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const connectedUsersList = connect(mapStateToProps)(UsersList)

export default connectedUsersList

