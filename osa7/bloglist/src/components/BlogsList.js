import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
// eslint-disable-next-line no-unused-vars
import {  BrowserRouter as Router, Route, Link, Redirect, withRouter  } from 'react-router-dom'

// import Blog from './Blog'

const BlogsList = (props) => (
  <div>
    <h2>blogs</h2>
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Blog</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {props.blogs.sort((a,b) => (a.likes>b.likes) ? -1 : 1)
        .map(blog =>
          <Table.Row key={blog.id}>
            <Table.Cell><Link to={`/blogs/${blog.id}`} >{blog.title} </Link></Table.Cell>
            <Table.Cell>{blog.author}</Table.Cell>
          </Table.Row>
        )}
    </Table>
  </div>
)

const mapStateToProps = (state) => {
  return {
    message: state.message,
    blogs: state.blogs,
    user: state.user
  }
}

const connectedBlogsList = connect(mapStateToProps)(BlogsList)

export default connectedBlogsList