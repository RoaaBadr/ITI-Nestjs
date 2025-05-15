/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength, IsNumber, Min, Max, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty({ minimum: 16, maximum: 60 })
  @IsNumber()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty({ pattern: '^01\\d{9}$' })
  @IsString()
  @Matches(/^01\d{9}$/)
  mobileNumber: string;
}

// log-in.dto
export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

// user-profile.dto
export class UserProfileDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  mobileNumber: string;
}
// why use apiProp and prop?