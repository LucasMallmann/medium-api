'use strict'

class Post {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required|unique:posts',
      content_id: 'required',
      cover_id: 'required'
    }
  }
}

module.exports = Post
