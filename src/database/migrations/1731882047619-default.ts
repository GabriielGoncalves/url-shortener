import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731882047619 implements MigrationInterface {
    name = 'Default1731882047619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Urls_Shorteners" ("id" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean, "originalUrl" text NOT NULL, "clicks_number" integer NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "PK_0a7f5f13ca84d99c1c049a988b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Urls_Shorteners" ADD CONSTRAINT "FK_0d4e536c7f6d2feec0d8fdfe284" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Urls_Shorteners" DROP CONSTRAINT "FK_0d4e536c7f6d2feec0d8fdfe284"`);
        await queryRunner.query(`DROP TABLE "Urls_Shorteners"`);
    }

}
