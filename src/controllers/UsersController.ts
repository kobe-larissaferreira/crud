import { Request, Response } from "express";
import { UsersServices } from "../services/usersServices";

class UsersController {
  async create(request: Request, response: Response) {
    const { usuario, phone, email } = request.body;

    const usersServices = new UsersServices();

    const users = await usersServices.create({ usuario, phone, email });

    return response.json(users);
  }
}

export { UsersController };
