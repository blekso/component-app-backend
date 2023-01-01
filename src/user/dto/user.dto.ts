import { IsNumber, IsString } from 'class-validator';

export class UserReviewDto {
  /**
   * User id in database
   * @example 1
   */
  @IsNumber()
  userId: number;

  /**
   * User follower id in database
   * @example 1
   */
  @IsNumber()
  componentId: number;

  /**
   * User review of the component
   * @example "lorem ipsum"
   */
  @IsString()
  review: string;
}
