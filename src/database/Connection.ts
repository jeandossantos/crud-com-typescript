import knex, { Knex } from 'knex';

import config from '../config/knexfile';

class Connection {
    public connection: Knex;

    public constructor () {
        this.connection = knex(config);
    }
}

export default new Connection().connection;
