import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

// afterEach(cleanup)


const blog = {
  title: 'titteli',
  author: 'tuottaja',
  likes: 3
}

test('renders title', () => {

  const component = render( <
    SimpleBlog blog = {
      blog
    }
  />
  )
  //   component.debug()
  const button = component.container.querySelector('button')
  // console.log(prettyDOM(button))

  expect(component.container).toHaveTextContent(
    'titteli'
  )
})

test('renders author', () => {

  const component = render( <
    SimpleBlog blog = {
      blog
    }
  />
  )

  expect(component.container).toHaveTextContent(
    'tuottaja'
  )
})

test('likes', () => {

  const component = render(
    <SimpleBlog blog = { blog } />
  )

  expect(component.container).toHaveTextContent('3')
})

test('clicking the button calls event handler once', async () => {

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog = { blog } onClick = {mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})

test('clicking the button twice calls event handler twice', async () => {

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog = { blog } onClick = {mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})