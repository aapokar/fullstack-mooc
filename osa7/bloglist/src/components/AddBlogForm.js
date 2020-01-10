import React from 'react'
import { createBlog } from '../reducers/blogsReducer'
import { newNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const AddBlogForm = (props) => {
  const titleHook = useField('text')
  const authorHook = useField('text')
  const urlHook = useField('text')
  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: titleHook.value,
      author: authorHook.value,
      url: urlHook.value
    }
    // setNewMessage(`a new blog ${titleHook.value} has been added`)
    // setTimeout(() => {
    //   setNewMessage(null)
    // }, 5000)
    props.newNotification('a new blog has been added')
    props.createBlog(blogObject)
    authorHook.onChange('')
    titleHook.onChange('')
    urlHook.onChange('')
  }


  return(
    <Form onSubmit={addBlog}>
      <h2>create new blog</h2>
      <Form.Field>
        <label>title:</label>
        <input
          {...titleHook}

        />
      </Form.Field>
      <Form.Field>
        <label>author:</label>
        <input
          {...authorHook}
        />
      </Form.Field>
      <Form.Field>
        <label>url: </label>
        <input
          {...urlHook}
          // type="text"
          // value={newUrl}
          // name="Url"
          // onChange={handleUrlChange}
        />
      </Form.Field>
      <Button color='blue' type="submit">tallenna</Button>
    </Form>
  )}

const mapDispatchToProps = {
  newNotification,
  createBlog
}

const connectedAddBlogForm = connect(null, mapDispatchToProps)(AddBlogForm)

export default connectedAddBlogForm