/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ExercisesController = () => import('#controllers/exercises_controller')
const UsersController = () => import('#controllers/users_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const PracticesController = () => import('#controllers/practices_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.on('/').render('pages/home').as('home')
router.resource('exercises', ExercisesController)
router.resource('users', UsersController)

router
  .post('/practices/:exerciseId/toggle', [PracticesController, 'toggle'])
  .as('practices.toggle')
  .use(middleware.auth())

router
  .group(() => {
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())
    router.post('/logout', [LoginController, 'exit']).as('login.exit').use(middleware.auth())
  })
  .prefix('/auth')
  .as('auth')

router
  .group(() => {
    router.get('/', [DashboardController, 'index']).as('index')
  })
  .prefix('/dashboard')
  .as('dashboard')
  .use(middleware.auth())
