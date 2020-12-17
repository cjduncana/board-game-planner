import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUser1607941140537 implements MigrationInterface {

  public up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(new Table({
      name: USER_TABLE_NAME,
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        isNullable: false,
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }, {
        name: 'email',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      }, {
        name: 'passwordHash',
        type: 'varchar',
        isNullable: false,
      }, {
        name: 'createdAt',
        type: 'timestamp',
        isNullable: false,
        default: 'NOW()',
      }, {
        name: 'updatedAt',
        type: 'timestamp',
        isNullable: false,
        default: 'NOW()',
      }, {
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
      }],
    }))
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(USER_TABLE_NAME)
  }
}

const USER_TABLE_NAME = 'Users'
