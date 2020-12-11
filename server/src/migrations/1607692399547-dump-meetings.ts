import {MigrationInterface, QueryRunner} from "typeorm";

export class dumpMeetings1607692399547 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE [IF EXISTS] meeting;
            `)
    }

}
