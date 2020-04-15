import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw Error('Incorrect e-mail/password combination');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw Error('Incorrect e-mail/password combination');

    return user;
  }
}

export default AuthenticateUserService;
