import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1734122449651 implements MigrationInterface {
    name = 'CreateTableUser1734122449651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "senha"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "tipo"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "endereco"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_type_enum" AS ENUM('COMERCIANTE', 'FORNECEDOR')`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "type" "public"."usuarios_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "phone" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "address" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_type_enum"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "endereco" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "telefone" character varying(20) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_tipo_enum" AS ENUM('COMERCIANTE', 'FORNECEDOR')`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "tipo" "public"."usuarios_tipo_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "senha" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying(255) NOT NULL`);
    }

}
