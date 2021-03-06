const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {
            username: 1,
            name: 1,
            id: 1
        })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    }
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
            new: true
        })
        response.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        const blog = await Blog.findById(id)

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({
                error: 'token missing or invalid'
            })
        }
  
        const userid = blog.user.toString()

        if (decodedToken.id.toString()===userid) {
            await Blog.findByIdAndDelete(id)
            response.status(204).json({status:"success"})
        }
        

    } catch (error) {
        next(error)
    }

})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = request.token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({
                error: 'token missing or invalid'
            })
        }

        // const user = await User.findById(body.userId)
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })


        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())
    } catch (exception) {
        response.status(400).send()
        next(exception)
    }

})

module.exports = blogsRouter