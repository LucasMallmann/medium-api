'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  content () {
    return this.belongsTo('App/Models/File', 'content_id', 'id')
  }

  cover () {
    return this.belongsTo('App/Models/File', 'cover_id', 'id')
  }
}

module.exports = Post
