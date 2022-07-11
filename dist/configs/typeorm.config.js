"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
exports.typeORMConfig = {
    type: `mysql`,
    host: `localhost`,
    port: 3306,
    username: `root`,
    password: `bbnm7316!!`,
    database: `BoardProject`,
    entities: [__dirname + "/../**/*.entity.{ts,js}"],
    synchronize: false,
    logging: true,
};
//# sourceMappingURL=typeorm.config.js.map