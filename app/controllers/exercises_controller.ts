// import type { HttpContext } from '@adonisjs/core/http'

import Exercise from '#models/exercise'
import { HttpContext } from '@adonisjs/core/http'

export default class ExercisesController {
  async index({ view, request }: HttpContext) {
    const qs = request.qs()
    const exercises = await Exercise.query()
      .if(qs.search, (query) => query.whereILike('title', `%${qs.search}%`))
      .preload('user')
      .preload('exerciseStatus')
      .apply((scope) => scope.inPublic())
    return view.render('pages/exercises/index', { exercises })
  }

  async show({ view, params }: HttpContext) {
    const exercise = await Exercise.findOrFail(params.id)
    await exercise.load('user')
    return view.render('pages/exercises/show', { exercise })
  }

  async edit({ view }: HttpContext) {
    return view.render('pages/exercises/edit', {})
  }
}
