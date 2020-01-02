const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))

        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('a specific blogtitle is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            'Go To Statement Considered Harmful'
        )
    })

    test('id is in right format', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.id)
        expect(contents).toBeDefined()
    })

    describe('adding', () => {

        test('a valid blog can be added', async () => {

            const newBlog = {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

            const contents = blogsAtEnd.map(r => r.title)
            expect(contents).toContain("TDD harms architecture")

        })

        test('no likes given is zero likes', async () => {
            const newBlog = {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                // likes: 0
            }

            const response = await api.post('/api/blogs').send(newBlog)
            expect(response.body.likes).toBe(0)
        })

        test('no title is 400 bad request', async () => {
            const newBlog = {
                // title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0
            }

            // const response = 
            await api.post('/api/blogs').send(newBlog)
                .expect(400)
        })


    })

    describe('deleting', () => {
        test('blog can be deleted after adding it', async () => {
            const newBlog = {
                title: "TDD harms architecture",
                author: "Robert C. Martin",
                url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
                likes: 0
            }

            const response = await api.post('/api/blogs').send(newBlog)
            await api.delete(`/api/blogs/${response.body.id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        })
    })
})

afterAll(() => {
    console.log('suljetaan yhteys')
    mongoose.connection.close()
})