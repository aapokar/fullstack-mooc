import React, { useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import Blog from './components/Blog'
import User from './components/User'
import Menuitems from './components/Menu'
import { Container, Menu, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'

function App(props) {

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        props.initializeBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(allUsers => {
        props.initializeUsers(allUsers)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      props.initializeUser(user)
    }
  }, [])

  const userById = (id) => {
    return props.users.find(a => a.id===id)
  }
  const blogById = (id) => {
    return props.blogs.find(a => a.id===id)
  }

  return (
    <div className = "App" >
      <Container >
      <Router>
        <h1>App of blogs and users</h1>
        <Notification />

        <h2>Login</h2>
        {props.user === null ?
          <LoginForm /> :
          <div>
            <Segment inverted>
              <Menuitems user={props.user}/>
            </Segment>
            <div>
              {/* <p>{props.user.name} logged in <button onClick={() => props.logoutUser()}>logout</button></p> */}
              <Togglable buttonLabel="new blog">
                <AddBlogForm />
              </Togglable>
              <Route exact path="/users" render={() =>
                <UsersList />
              } />
              <Route exact path="/blogs" render={() =>
                <BlogsList />
              } />
              <Route exact path="/users/:id" render={({ match }) =>
                <User user={userById(match.params.id)} />
              } />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog blog={blogById(match.params.id)} />
              } />
            </div>
          </div>
        }
      </Router>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  logoutUser,
  initializeUsers
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default connectedApp