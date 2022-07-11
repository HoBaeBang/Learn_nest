import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
export declare class UserRepository extends Repository<User> {
    createUser(authCredentialDto: AuthCredentialDto): Promise<void>;
}
