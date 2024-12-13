// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { TypeUser } from '../enum/type-user.enum';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: TypeUser })
  type: TypeUser;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 500 })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

   // Garante que o `createdAt` será preenchido ao criar o registro
   @BeforeInsert()
   setCreateDate() {
     this.createdAt = new Date();
   }
 
   // Atualiza o `updatedAt` toda vez que o registro for modificado
   @BeforeUpdate()
   setUpdateDate() {
     this.updatedAt = new Date();
   }
}