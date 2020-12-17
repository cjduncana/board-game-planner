import bcrypt from 'bcryptjs'
import { EntityRepository, Repository } from 'typeorm'

import UserEntity from '../entities/user'

@EntityRepository(UserEntity)
export default class User extends Repository<UserEntity> {

  public async createUser(name: string, email: string, password: string): Promise<UserEntity> {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    return this.save({ name, email, passwordHash: hash })
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.findOneOrFail({ email })

    const isValid = await bcrypt.compare(password, user.passwordHash)

    return isValid ? user : Promise.reject('Not a valid password')
  }
}
