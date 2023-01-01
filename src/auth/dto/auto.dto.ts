import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  /**
   * User email
   * @example email@email.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User password
   * @example password123
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  /**
   * User name
   * @example username
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * User email
   * @example email@email.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User password
   * @example password123
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
