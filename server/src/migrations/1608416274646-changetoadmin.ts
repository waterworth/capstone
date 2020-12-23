import { MigrationInterface, QueryRunner } from 'typeorm';

export class changetoadmin1608416274646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE public.user SET "isAdmin" = true WHERE id = 1
      `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
