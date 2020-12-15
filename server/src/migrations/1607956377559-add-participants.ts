import { MigrationInterface, QueryRunner } from 'typeorm';

export class addParticipants1607956377559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            update public.user SET "isAdmin" = true WHERE id = 5;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
