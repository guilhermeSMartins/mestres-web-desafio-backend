import { IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsString()
  @MinLength(5, {
    message: 'Sua senha precisa ter no mínimo 5 caracteres!',
  })
  password: string;
}
