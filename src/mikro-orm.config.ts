import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Meeting } from "./entities/Meeting";
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), 
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Meeting],
    dbName: 'capstone',
    type: 'postgresql',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];