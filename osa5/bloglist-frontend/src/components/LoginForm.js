import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}
) => (
  <form onSubmit={handleSubmit}>
    <div>
        username
      <input
        {...username}
      />
    </div>
    <div>
        password
      <input
        {...password}
        // type="password"
        // value={password}
        // name="Password"
        // onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm