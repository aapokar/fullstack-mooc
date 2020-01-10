import blogService from '../services/blogs'

const blogsReducer = (state=[], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE':
    return state.filter(blog => blog.id!==action.id)
  case 'ADDLIKE':
    return state.map(blog => blog.id!==action.updatedBlog.id ? blog : action.updatedBlog)
  default:
    return state
  }}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch ({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const deleteBlog = ({ id }) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id: id
    })
  }
}

export const addLike = likedBlog => {
  const updatedBlog = { ...likedBlog, likes: likedBlog.likes+1 }
  return async dispatch => {
    await blogService.update(updatedBlog.id, updatedBlog)
    dispatch({
      type: 'ADDLIKE',
      updatedBlog
    })
  }
}

export default blogsReducer