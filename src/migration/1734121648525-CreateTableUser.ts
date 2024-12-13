import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1734121648525 implements MigrationInterface {
    name = 'CreateTableUser1734121648525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."usuarios_tipo_enum" AS ENUM('COMERCIANTE', 'FORNECEDOR')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "senha" character varying NOT NULL, "tipo" "public"."usuarios_tipo_enum" NOT NULL, "telefone" character varying(20) NOT NULL, "endereco" character varying(500) NOT NULL, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_tipo_enum"`);
    }

}
