import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class DashboardController {
  async index({ auth, view }: HttpContext) {
    const practices = await auth
      .user!.related('practices')
      .query()
      .where('practices.created_at', '>=', DateTime.now().startOf('day').toSQL())
      .preload('user')
    return view.render('pages/dashboard', { practices })
  }
}
