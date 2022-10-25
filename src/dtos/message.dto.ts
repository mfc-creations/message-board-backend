import { IsString } from "class-validator";
export class CreateMessageDto {
  @IsString()
  public message: string;

  @IsString()
  public user: string;
}
