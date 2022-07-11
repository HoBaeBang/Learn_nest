import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    signin(authCredentialDto: AuthCredentialDto): Promise<{
        accessToken: string;
    }>;
    findUserFromName(authCredentialDto: AuthCredentialDto): Promise<AuthCredentialDto>;
}
