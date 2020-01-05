import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, handleLike, handleDelete, user }, ref) => {

  const [visible, setVisible] = useState(false)

  const showWhenClicked = { display: visible ? '' : 'none' }

  const handleClick = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {

    return {
      blog
    }
  })

  const blogStyle = {
    paddingTop: 5,
    fontFamily: 'Lucida Console',
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    margin: '1px',
    lineHeight: '20px'
  }


  return (
    <div style={blogStyle} className='blog'>
      <div onClick={handleClick} className='clickable'>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenClicked} className='hiddenContent'>
        {blog.url}
        <p>likes: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
        <p>added by {blog.user.name}</p>
        {user &&<button onClick={() => handleDelete(blog)}>remove</button>}
      </div>
    </div>
  )
})

export default Blog