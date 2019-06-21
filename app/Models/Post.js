'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  cover () {
    return this.belongsTo('App/Models/File')
  }

  content () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Post
