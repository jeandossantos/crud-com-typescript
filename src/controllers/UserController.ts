import { Request, Response } from 'express';

import knex from '../database/Connection';

import utils from '../utils/Utils';
import { existsOrError, equalsOrError, notExistsOrError } from './validation';

interface UserInterface {
    id?: number,
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
    admin?: boolean,
    // eslint-disable-next-line camelcase
    delete_at?: string
}

const create = async (req:Request, resp: Response) => {
    const user:UserInterface = req.body;

    try {
        const userDB:UserInterface = await knex('users').where({ email: user.email }).first();

        notExistsOrError(userDB, 'E-mail já Cadastrado!');
        existsOrError(user.name, 'Nome é Obrigatório!');
        existsOrError(user.email, 'E-mail é Obrigatório!');
        existsOrError(user.password, 'Senha é Obrigatório!');
        existsOrError(user.confirmPassword, 'Confirmação de Senha é Obrigatório!');
        equalsOrError(user.password, user.confirmPassword, 'Senhas não coicidem!');
    } catch (msg) {
        return resp.status(400).send(msg);
    }

    user.password = utils.encryptPassword(user.password);

    delete user.confirmPassword;

    knex('users')
        .insert(user)
        .then(_ => resp.status(203).send())
        .catch(e => resp.status(500).send(e));
};

export default {
    create
};
