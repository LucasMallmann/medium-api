'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const posts = await Post.query()
      .where('user_id', params.users_id)
      .with('user')
      .with('cover')
      .with('content')
      .fetch()

    return posts
  }

  async list ({ request }) {
    const { page, limit } = request.get()
    const posts = await Post.query()
      .with('user')
      .paginate(page || 1, limit || 10)
    return posts
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params }) {
    const INITIAL_NUMBER_OF_CLAPS = 0

    const data = request.only(['title', 'content_id', 'cover_id'])

    const post = await Post.create({
      ...data,
      user_id: params.users_id,
      claps: INITIAL_NUMBER_OF_CLAPS
    })

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   */
  async show ({ params }) {
    const post = await Post.findOrFail(params.id)
    await post.load('user')
    await post.load('content')
    await post.load('cover')
    return post
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'content_id', 'cover_id'])

    post.merge(data)

    await post.save()

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
  }
}

module.exports = PostController
