import {
  MigrationInterface, QueryRunner, TableColumn,
} from 'typeorm';

export class amountFieldOnProduct1615312836079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'amount',
      type: 'int',
      default: 0,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'amount');
  }
}
