import ExerciseStatuses from '#roles/exercise_statuses'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('exercise_status_id')
        .unsigned()
        .references('exercise_statuses.id')
        .notNullable()
        .defaultTo(ExerciseStatuses.PUBLIC)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status_id')
    })
  }
}
