import {MigrationInterface, QueryRunner} from "typeorm";

export class disabletimelinepreview1671100263758 implements MigrationInterface {
    name = 'disabletimelinepreview1671100263758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableTimelinePreview" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableTimelinePreview"`);
    }

}
