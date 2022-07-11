import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    if (await this.findUserFromName(authCredentialDto)) {
      throw new NotAcceptableException(`이미 존재하는 회원입니다.`);
    }
    return this.userRepository.createUser(authCredentialDto);
  }

  async signin(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.findUserFromName(authCredentialDto);

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성(secret + payload)필요
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("login failed");
    }
  }

  async findUserFromName(authCredentialDto: AuthCredentialDto): Promise<AuthCredentialDto> {
    return await this.userRepository.findOne({ username: authCredentialDto.username})
  }
}
