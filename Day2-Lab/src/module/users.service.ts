/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, UnauthorizedException, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto , LoginUserDto , UserProfileDto } from './dto/user-dto';

@Injectable()
export class UsersService {    
  constructor(@InjectModel(User.name) private userModel: Model<User>,    
  private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
    // extract data from dtos
    const { email, password } = createUserDto;

    // 1) Check if user exists in db
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // 2) Hash password (security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3) Create user with [email, hashed password] in db
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
        await user.save();

    // 4) Generate and return token
    const token = this.generateToken(user);

    return { user, token };
  }
                        /* -------------------------------------- */
  async login(loginUserDto: LoginUserDto): Promise<{ user: User; token: string }> {
    // extract data
    const { email, password } = loginUserDto;

    // 1) Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2) Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3) Generate token
    const token = this.generateToken(user);

    return { user, token };
  }
                        /* -------------------------------------- */

  async findUserByEmail(email: string): Promise<UserProfileDto> {
  const user = await this.userModel.findOne({ email }).select('-password');
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
  }

  async findAllUsers(excludeEmail: string): Promise<UserProfileDto[]> {
    return this.userModel.find({ email: { $ne: excludeEmail } }).select('-password');
  }

  private generateToken(user: User): string {
    // this.configService.get<string>('JWT_SECRET')
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: user._id, email: user.email }, 
      this.configService.getOrThrow<string>('JWT_SECRET'),
    { expiresIn: '1d' }
  );
  }
}