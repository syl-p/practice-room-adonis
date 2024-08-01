import Practice from '#models/practice'
import type { HttpContext } from '@adonisjs/core/http'

export default class PracticesController {
  async index({}: HttpContext) {}

  async toggle({ auth, params, response }: HttpContext) {
    const userId = auth.user!.id
    const { exerciseId, duration } = params

    await Practice.create({ exerciseId, userId, duration: duration || 10 })
    return response.redirect().back()
  }
}
