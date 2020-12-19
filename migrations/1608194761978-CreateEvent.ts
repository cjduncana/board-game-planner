import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEvent1608194761978 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.createTable(new Table({
        name: EVENT_TABLE_NAME,
        columns: [{
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isNullable: false,
        }, {
          name: 'creatorId',
          type: 'varchar',
          isNullable: false,
        }, {
          name: 'gameIds',
          type: 'varchar',
          isNullable: false,
        }, {
          name: 'startTime',
          type: 'timestamp',
          isNullable: false,
        }, {
          name: 'latitude',
          type: 'float',
          isNullable: false,
        }, {
          name: 'longitude',
          type: 'float',
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
        foreignKeys: [{
          columnNames: ['creatorId'],
          referencedColumnNames: ['id'],
          referencedTableName: USER_TABLE_NAME,
        }],
      })),
      queryRunner.createTable(new Table({
        name: EVENT_PLAYER_TABLE_NAME,
        columns: [{
          name: 'eventId',
          type: 'varchar',
        }, {
          name: 'playerId',
          type: 'varchar',
        }],
        foreignKeys: [{
          columnNames: ['eventId'],
          referencedColumnNames: ['id'],
          referencedTableName: EVENT_TABLE_NAME,
        }, {
          columnNames: ['playerId'],
          referencedColumnNames: ['id'],
          referencedTableName: USER_TABLE_NAME,
        }],
      })),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropTable(EVENT_TABLE_NAME),
      queryRunner.dropTable(EVENT_PLAYER_TABLE_NAME),
    ])
  }
}

const EVENT_TABLE_NAME = 'Events'
const EVENT_PLAYER_TABLE_NAME = 'EventsPlayers'
const USER_TABLE_NAME = 'Users'
