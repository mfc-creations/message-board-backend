import {
  IsEmail,
  IsString,
  IsEnum,
  ValidateIf,
  IsOptional,
} from "class-validator";
export class CreateUserDto {
  @IsString()
  public username: string;

  @ValidateIf((payload) => !payload.type)
  @IsString()
  public password: string;
}
