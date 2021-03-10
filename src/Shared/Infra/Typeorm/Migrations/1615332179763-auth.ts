import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class auth1615332179763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'authorizations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isUnique: true,
          isGenerated: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'token',
          type: 'varchar',
        },
        {
          name: 'userId',
          type: 'varchar',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
