import { IsEmail } from 'class-validator'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('Users')
export default class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email!: string

  @Column({ type: 'varchar' })
  passwordHash!: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date

  @Column({ type: 'timestamp', nullable: true })
  deletedAt!: Date | null
}
