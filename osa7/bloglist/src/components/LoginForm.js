import React from 'react'
// import PropTypes from 'prop-types'
import { useField } from '../hooks/'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { newNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = (props) => {
  const usernameHook = useField('text')
  const passwordHook = useField('text')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameHook.value
      const password = passwordHook.value

      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      usernameHook.onChange('')
      passwordHook.onChange('')

    } catch (exception) {
      props.newNotification('wrong password or username')
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          {...usernameHook}
        />
      </div>
      <div>
        password
        <input
          {...passwordHook}
        // type="password"
        // value={password}
        // name="Password"
        // onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
// }

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  setUser,
  newNotification
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connectedLoginForm