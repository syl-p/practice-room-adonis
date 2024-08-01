import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ auth, request, response }: HttpContext) {
    // 1 valid
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    return response.redirect().toRoute('dashboard.index')
  }

  async exit({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toRoute('home')
  }
}
