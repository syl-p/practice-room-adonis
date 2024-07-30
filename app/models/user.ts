import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Exercise from './exercise.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare avatarUrl: string | null

  @column()
  declare password: string | null

  @manyToMany(() => Exercise, {
    pivotTable: 'practices',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'exercise_id',
    pivotColumns: ['duration'],
    pivotTimestamps: true,
  })
  declare practices: ManyToMany<typeof Exercise>

  @hasMany(() => Exercise)
  declare exercises: HasMany<typeof Exercise>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
