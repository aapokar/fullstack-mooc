import React from 'react'

const AddBlogForm = ({
  handleSubmit,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return(
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title:
        <input
          {...newTitle}

        />
      </div>
      <div>
        author:
        <input
          {...newAuthor}
        />
      </div>
      <div>
        url:
        <input
          {...newUrl}
          // type="text"
          // value={newUrl}
          // name="Url"
          // onChange={handleUrlChange}
        />
      </div>
      <button type="submit">tallenna</button>
    </form>
  )}

export default AddBlogForm