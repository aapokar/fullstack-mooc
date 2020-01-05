import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
    name: 'käyttäjä'
}

const blog = {
  title: 'titteli',
  author: 'tuottaja',
  likes: 3,
  user: {user}
}


describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog}
      />
    )
  })

  test('renders title', () => {

    expect(component.container).toHaveTextContent('titteli')
  })

  test('renders author', () => {

    expect(component.container).toHaveTextContent('tuottaja')
  })

  test('hides hidden content by default', () => {

    const div = component.container.querySelector('.hiddenContent')

    expect(div).toHaveStyle('display: none')
  })

  test('shows hiddenContent after click', () => {

    const button = component.container.querySelector('.clickable')
    fireEvent.click(button)

    const div = component.container.querySelector('.hiddenContent')

    expect(div).not.toHaveStyle('display: none')
  })

})