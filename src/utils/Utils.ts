import bcrypt from 'bcrypt';

export default class Utils {
    public static encryptPassword (password: string, salt: number = 10) {
        const saltOrRounds = bcrypt.genSaltSync(salt);

        return bcrypt.hashSync(password, saltOrRounds);
    }
}
