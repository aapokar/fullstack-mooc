const blogs = [{


  'id': '5e0df2fee672c04494211d11',
  'title': 'blogit',
  'author': 'Ilves',
  'url': 'osoite111',
  'likes': 11,
  'user': {
    'id':'5e0db3141c72f73ac03e9e8f',
    'name':'juuseri'
  }

}]

const getAll = () => {
  // console.log(blogs)
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default {
  getAll,
  setToken
}