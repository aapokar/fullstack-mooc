import React from 'react'
import {
  render,
  waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {
  test('renders all blogs it gets from backend', async () => {
    const component = render( 
      <App />
    )


    component.rerender( < App /> )

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    // expect(component.container).toHaveTextContent(
    //   'titteli'
    // )

  })
  test('renders blogs when user is signed in', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render( 
      <App />
    )

    component.rerender( < App /> )
    await waitForElement(
      () => component.getByText('blogs')
    )
    // component.debug()
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(1)

  })

})