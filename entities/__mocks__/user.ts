import { getRepository } from 'typeorm'

import User from '../user'

export default function getMockUser(): User {
  return getRepository(User).create({
    id: '1a89ff62-d165-4187-b7dc-9732f0e0a8ec',
    name: 'John Doe',
    email: 'john.doe@example.com',
    passwordHash: '$2a$10$P5z3TMJq76IhEcGV1k84i.wnJ6V4F9kmbjONfDwNbJu0wUtX5mzM.',
  })
}
