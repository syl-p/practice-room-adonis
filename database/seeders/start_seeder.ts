import ExerciseStatus from '#models/exercise_status'
import ExerciseStatuses from '#roles/exercise_statuses'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ExerciseStatus.createMany([
      {
        id: ExerciseStatuses.PUBLIC,
        name: 'Public',
      },
      {
        id: ExerciseStatuses.PRIVATE,
        name: 'Private',
      },
      {
        id: ExerciseStatuses.NOT_REFERENCED,
        name: 'Not referenced',
      },
    ])
  }
}
