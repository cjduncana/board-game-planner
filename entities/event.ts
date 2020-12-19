import {
  Entity,
  Column,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import User from './user'

@Entity('Events')
export default class Event {

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => User)
  creator!: User

  @ManyToMany(() => User)
  @JoinTable({
    name: 'EventsPlayers',
    joinColumn: { name: 'eventId' },
    inverseJoinColumn: { name: 'playerId' },
  })
  players!: User[]

  @Column({
    type: 'varchar',
    transformer: {
      from: (value: string): string[] => value.split(','),
      to: (ids: string[]): string => ids.join(','),
    },
  })
  gameIds!: string[]

  @Column({ type: 'timestamp' })
  startTime!: Date

  @Column({ type: 'float' })
  latitude!: number

  @Column({ type: 'float' })
  longitude!: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date

  @Column({ type: 'timestamp', nullable: true })
  deletedAt!: Date | null
}
