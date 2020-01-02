var lodash = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (big, item) => {
        return item.likes > big ? item.likes : big
    }

    const mostLikes = blogs.reduce(reducer, 0)
    const favorite = blogs.find(blog => blog.likes === mostLikes)

    if (favorite) {
    delete favorite._id
    delete favorite.url
    delete favorite.__v
    }

    return favorite

}

const mostBlogs = (blogs) => {
    const reducer = (sum, item) => {
        return sum > item ? sum : item
    }
    
    //Find out all authors and amount of their blogtexts
    const authorsAndAmounts = lodash.countBy(blogs.map(blog => blog.author))

    //Separate authors
    const authors = lodash.keys(authorsAndAmounts)

    //How many has most active written
    const mostWritten = authors.map(author => {
        return blogs.filter(item => item.author===author).length
    })
    .reduce(reducer,0)

    
    const result = lodash.findKey(authorsAndAmounts, function(x) {return x===mostWritten})

    return {author: result, blogs: mostWritten}
}

const mostLikes = (blogs) => {
    const reducer = (sum, item) => {
        // compare likes of objects
        return sum.likes > item.likes ? sum : item
    }

    //Find out all authors and amount of their blogtexts
    const authorsAndAmounts = lodash.countBy(blogs.map(blog => blog.author))

    //Separate authors
    const authors = lodash.keys(authorsAndAmounts)

    // Map to list of authors blogs and counts totalLikes
    const greatestLikes = authors.map(author => {
        return {author: author, 
            likes:totalLikes(blogs.filter(item => item.author===author))}
    })
    // And find out from the returned objects the one with most likes
    .reduce(reducer)
    
    // console.log(typeof(greatestLikes))

    return greatestLikes

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}