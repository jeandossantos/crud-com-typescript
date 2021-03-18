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

class UserController {
    public async create (req:Request, resp: Response) {
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
            .then(_ => resp.status(201).send())
            .catch(e => resp.status(500).send(e));
    }

    public getAll (req:Request, resp:Response) {
        knex('users')
            .select('id', 'name', 'email', 'admin', 'deleted_at')
            .then(users => resp.json(users))
            .catch(e => resp.status(500).send());
    }

    public getById (req:Request, resp:Response) {
        knex('users')
            .where({ id: req.params.id })
            .first()
            .then(user => resp.json(user))
            .catch(e => resp.status(500).send());
    }

    public remove (req:Request, resp:Response) {
        knex('users')
            .where({ id: req.params.id })
            .first()
            .del()
            .then(_ => resp.status(203).send())
            .catch(e => resp.status(500).send(e));
    }

    public update (req:Request, resp: Response) {
        const { name, email, admin } = req.body;

        const user = { name, email, admin };

        knex('users')
            .update(user)
            .where({ id: req.params.id })
            .then(_ => resp.status(203).send())
            .catch(e => resp.status(500).send(e));
    }
}

export default new UserController();
