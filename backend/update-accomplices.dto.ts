import { IsInt, IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class AccompliceDTO {
  @IsInt()
  @IsNotEmpty()
  characterId: number;
}

export class UpdateAccomplicesDTO {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AccompliceDTO)
  accomplices: AccompliceDTO[];
}
