import { IsInt, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class AccompliceDto {
  @IsInt()
  @IsNotEmpty()
  characterId: number;
}

export class UpdateAccomplicesDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AccompliceDto)
  accomplices: AccompliceDto[];
}
