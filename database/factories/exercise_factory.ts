import factory from '@adonisjs/lucid/factories'
import Exercise from '#models/exercise'
import ExerciseStatuses from '#roles/exercise_statuses'
import { UserFactory } from './user_factory.js'

export const ExerciseFactory = factory
  .define(Exercise, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    }
  })
  .relation('user', () => UserFactory)
  .relation('practicedBy', () => UserFactory)
  .state('public', (row, {}) => {
    row.exerciseStatusId = ExerciseStatuses.PUBLIC
  })
  .state('private', (row, {}) => {
    row.exerciseStatusId = ExerciseStatuses.PRIVATE
  })
  .state('notReferenced', (row, {}) => {
    row.exerciseStatusId = ExerciseStatuses.NOT_REFERENCED
  })
  .build()
