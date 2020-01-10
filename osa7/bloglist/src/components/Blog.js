import React, { useState } from 'react'
import { deleteBlog, addLike } from '../reducers/blogsReducer'
import { connect } from 'react-redux'

const Blog = (props) => {

  const [visible, setVisible] = useState(false)
  const blog = props.blog
  console.log(props, ' blogissa')
  if (blog===undefined) {
    return null
  }
  console.log(props)
  const user = props.user
  // const showWhenClicked = { display: visible ? '' : 'none' }

  // const handleClick = () => {
  //   setVisible(!visible)
  // }

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
      {/* <div onClick={handleClick} className='clickable'> */}
      
        <h2>{blog.title}, author : {blog.author}</h2>
      
      {/* <div style={showWhenClicked} className='hiddenContent'> */}
      <a href={blog.url}>{blog.url}</a>
      <p>likes: {blog.likes} <button onClick={() => props.addLike(blog)}>like</button></p>
      <p>added by {blog.user.name}</p>
      {user &&<button onClick={() => props.deleteBlog(blog)}>remove</button>}
      {/* </div> */}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: ownProps.blog
  }
}

const mapDispatchToProps = {
  deleteBlog,
  addLike
}

const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default connectedBlog