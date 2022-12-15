/* eslint-disable no-unused-vars */
const _ = require('lodash')
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
  const reducer = (favorite, item) => {
    if (favorite.likes > item.likes) {
      return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
      }
    } else {
      return {
        title: item.title,
        author: item.author,
        likes: item.likes
      }
    }
  }

  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}