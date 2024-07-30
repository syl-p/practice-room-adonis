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

router.on('/').render('pages/home').as('home')
router.resource('exercises', ExercisesController)
router.resource('users', UsersController)

router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    router.post('/register', [RegisterController, 'store']).as('register.store')
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')
  })
  .prefix('/auth')
  .as('auth')
