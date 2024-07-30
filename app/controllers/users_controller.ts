// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ view }: HttpContext) {
    const users = await User.query()
      .has('exercises')
      .withCount('exercises', (query) => query.apply((scope) => scope.inPublic()))
      .orderBy([{ column: 'username', order: 'asc' }])
    return view.render('pages/users/index', { users })
  }

  async show({ view, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.load('exercises', (exerciseQuery) => {
      exerciseQuery.preload('exerciseStatus')
    })

    const practices = await user.related('practices').query()
    return view.render('pages/users/show', { user, practices })
  }
}
