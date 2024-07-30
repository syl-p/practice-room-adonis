import { DateTime } from 'luxon'

import { BaseModel, beforeCreate, belongsTo, column, manyToMany, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import ExerciseStatus from './exercise_status.js'
import stringHelpers from '@adonisjs/core/helpers/string'
import ExerciseStatuses from '../enums/exercise_statuses.js'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare content: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare exerciseStatusId: number

  @belongsTo(() => ExerciseStatus)
  declare exerciseStatus: BelongsTo<typeof ExerciseStatus>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'practices',
    pivotColumns: ['duration'],
    pivotTimestamps: true,
  })
  declare practicedBy: ManyToMany<typeof User>

  static inPublic = scope((query) => {
    query.where('exerciseStatusId', ExerciseStatuses.PUBLIC)
  })

  @beforeCreate()
  static async slugify(exercise: Exercise) {
    exercise.slug = stringHelpers.slug(exercise.title)
  }
}
