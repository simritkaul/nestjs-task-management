import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UNIQUE_CONSTRAINT_ERROR_CODE } from './constants';
import { SignUpDetailsDto } from './dto/signup-details.dto';
import { SignInResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    private jwtService: JwtService,
  ) {}

  async signUp(signUpDetailsDto: SignUpDetailsDto): Promise<void> {
    try {
      return await this.usersRepository.createUser(signUpDetailsDto);
    } catch (error) {
      if (error.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignInResponseDto> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        username,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        username,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
