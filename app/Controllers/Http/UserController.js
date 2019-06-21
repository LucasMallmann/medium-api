'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class UserController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'email', 'profile_pic'])
    user.merge(data)

    await user.save()
    return user
  }
}

module.exports = UserController
