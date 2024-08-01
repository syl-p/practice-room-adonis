import { DateTime } from 'luxon'
import { BaseModel, column, computed, hasMany, manyToMany, scope } from '@adonisjs/lucid/orm'
import Exercise from './exercise.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
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
