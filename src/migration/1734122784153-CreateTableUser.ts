import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1734122784153 implements MigrationInterface {
    name = 'CreateTableUser1734122784153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "criado_em"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "atualizado_em"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "atualizado_em" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "criado_em" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
