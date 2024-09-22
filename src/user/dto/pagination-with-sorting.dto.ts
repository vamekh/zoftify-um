import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class PaginationWithSortingDto extends PaginationDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc';
}
