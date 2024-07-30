import { ExerciseFactory } from '#database/factories/exercise_factory'
import { UserFactory } from '#database/factories/user_factory'
import Exercise from '#models/exercise'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomInt } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    const defaultUsers = await UserFactory.with('exercises', 10, (exercise) => {
      exercise.apply('public')
    }).createMany(5)

    const allExercises = defaultUsers.map(({ exercises }) => exercises).flat(1)

    const promises = defaultUsers.map(async (user) => {
      await this.#attachUserToPracticedExercise(user, allExercises, 10)
    })

    await Promise.all(promises)
  }

  async #attachUserToPracticedExercise(user: User, exercises: Exercise[], number: number) {
    const exerciseRandomIds = this.#getRandom(exercises, number).map(({ id }) => id)
    return user.related('practices').attach(exerciseRandomIds)
  }

  #getRandom<T>(array: T[], pluck: number) {
    const shuffle = array.sort(() => 0.5 - Math.random())
    return shuffle.slice(0, pluck)
  }
}
