import { ApiProperty } from "@nestjs/swagger";
import { TypeUser } from '../enum/type-user.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
     @ApiProperty({ description: 'Nome completo do usuário', example: 'João Silva' })
      @IsString()
      @IsNotEmpty()
      @Length(3, 255)
      name: string;
    
      @ApiProperty({ description: 'E-mail único do usuário', example: 'joao@email.com' })
      @IsEmail()
      email: string;
    
      @ApiProperty({ description: 'Senha do usuário', example: 'senhaSegura123' })
      @IsString()
      @IsNotEmpty()
      password: string;
    
      @ApiProperty({ description: 'Tipo de usuário', enum: TypeUser, example: TypeUser.COMERCIANTE })
      @IsEnum(TypeUser)
      type: TypeUser;
    
      @ApiProperty({ description: 'Telefone para contato', example: '11987654321' })
      @IsString()
      @Length(10, 20)
      phone: string;
    
      @ApiProperty({ description: 'Endereço do comerciante', example: 'Rua das Flores, 123, São Paulo, SP' })
      @IsString()
      @Length(5, 500)
      address: string;
}
