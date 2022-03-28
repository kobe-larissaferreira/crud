import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/usersRepository";

interface IUserCreate {
  usuario: string;
  phone: string;
  email: string;
}

class UsersServices {
  async create({ usuario, phone, email }: IUserCreate) {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = usersRepository.create({ usuario, phone, email });
    await usersRepository.save(users);
    return users;
  }
}

export { UsersServices };
