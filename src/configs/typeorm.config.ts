import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Board} from '../boards/board.entity'
import { User } from '../auth/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {

  type: `mysql`,
  host: `localhost`,
  port: 3306,
  username: `root`,
  password: `bbnm7316!!`,
  database: `BoardProject`,
  entities: [__dirname + "/../**/*.entity.{ts,js}"],
  // entities : [Board,User],
  synchronize: false,
  logging: true,

  // migrations:[]
};
