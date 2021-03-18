import path from 'path';

export default {
    client: 'postgresql',
    connection: {
        database: 'knowledge_com_ts',
        user: 'postgres',
        password: '94198380'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.join(__dirname, '..', 'database', 'migrations')
    }
};
