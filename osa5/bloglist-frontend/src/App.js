import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Message'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/'

function App() {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const usernameHook = useField('text')
  const passwordHook = useField('text')
  const [user, setUser] = useState(null)
  const titleHook = useField('text')
  const authorHook = useField('text')
  const urlHook = useField('text')


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setUser(user)
      usernameHook.onChange('')
      passwordHook.onChange('')

    } catch (exception) {
      setErrorMessage('wrong password or username')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: titleHook.value,
      author: authorHook.value,
      url: urlHook.value
    }

    const response = await blogService.create(blogObject)
    console.log(response)
    setNewMessage(`a new blog ${titleHook.value} has been added`)
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
    setBlogs(blogs.concat(response))
    authorHook.onChange('')
    titleHook.onChange('')
    urlHook.onChange('')
  }


  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a,b) => (a.likes>b.likes) ? -1 : 1)
        .map(blog =>
          <Blog key={blog.id} blog={blog} ref={blogRef} handleLike={addLike}
            handleDelete={deleteBlog} user = {user}
          />
        )}
    </div>
  )

  const blogRef = React.createRef()

  const deleteBlog = async (blog) => {
    const id = blog.id

    try {
      // eslint-disable-next-line no-unused-vars
      const deletedBlog = await blogService.remove(id)
      await setBlogs(blogs.filter(blog => blog.id!==id))
    } catch (error) {
      setErrorMessage('jokin meni pieleen: ',error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const addLike = async (blog) => {

    const newObject = { ...blog, likes: (blog.likes+1) }

    try {
      const updatedBlog = await blogService.update(newObject.id, newObject)
      await setBlogs(blogs.map(blog => blog.id!==newObject.id ? blog : updatedBlog))
    } catch (error) {
      setErrorMessage('jokin meni pieleen: ', error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }


  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    usernameHook.onChange('')
    passwordHook.onChange('')
  }



  return (
    <div className = "App" >
      <h1>Blogs</h1>
      <Notification message={newMessage} status ="message" />
      <Notification message={errorMessage} />
      <h2>Login</h2>
      {user === null ?
        <LoginForm username={usernameHook} password={passwordHook}
          handleSubmit={handleLogin} /> :
        <div>
          <p>{user.name} logged in <button onClick={() => logout()}>logout</button></p>
          <Togglable buttonLabel="new blog">
            <AddBlogForm handleSubmit={addBlog}
              newTitle={titleHook}
              newAuthor={authorHook}
              newUrl={urlHook} />
          </Togglable>
          {blogForm()}
        </div>
      }

    </div>
  )
}

export default App