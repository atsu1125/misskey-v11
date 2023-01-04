import {MigrationInterface, QueryRunner} from "typeorm";

export class disableinvitation1672797351457 implements MigrationInterface {
    name = 'disableinvitation1672797351457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableInvitation" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableInvitation"`);    
    }
}
