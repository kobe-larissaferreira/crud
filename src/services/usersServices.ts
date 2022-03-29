import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/usersRepository";

interface IUserCreate {
  usuario: string;
  phone: string;
  email: string;
}

interface IUsersId {
  id: string;
}

interface IUsersUpdate {
  id: string;
  usuario: string;
  phone: string;
  email: string;
}

class UsersServices {
  async create({ usuario, phone, email }: IUserCreate) {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailAlreadyExists = await usersRepository.findOne({ email });
    if (emailAlreadyExists) {
      throw new Error("Email already exists!");
    }
    const users = usersRepository.create({ usuario, phone, email });
    await usersRepository.save(users);

    return users;
  }

  async index() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async show({ id }: IUsersId) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findOne({ id });

    if (!users) {
      throw new Error("User id not found");
    }

    return users;
  }

  async delete({ id }: IUsersId) {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findOne({ id });
    if (!users) {
      throw new Error("User id not found");
    }
    return await usersRepository.delete({ id });
  }

  async update({ id, usuario, phone, email }: IUsersUpdate) {
    const usersRepository = getCustomRepository(UsersRepository);

    let users = await usersRepository.findOne({ id });

    if (!users) {
      throw new Error("User id not found");
    }
    await usersRepository.update(id, {
      usuario,
      phone,
      email,
    });
    await usersRepository.findOne({ id });

    return users;
  }
}

export { UsersServices };
