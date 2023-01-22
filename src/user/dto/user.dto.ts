import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UserReviewDto {
  /**
   * User id in database
   * @example 1
   */
  @IsNumber()
  userId: number;

  /**
   * User follower id in database
   * @example "1"
   */
  @IsString()
  @IsNotEmpty()
  componentId: string;

  /**
   * User review of the component
   * @example "lorem ipsum"
   */
  @IsString()
  review: string;

  /**
   * User star of the component
   * @example 1
   */
  @IsNumber()
  @Min(1)
  @Max(5)
  star: number;
}
