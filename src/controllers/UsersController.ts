import { Request, Response } from "express";
import { UsersServices } from "../services/usersServices";

class UsersController {
  async create(request: Request, response: Response) {
    const { usuario, phone, email } = request.body;

    const usersServices = new UsersServices();
    try {
      const users = await usersServices.create({ usuario, phone, email });
      return response.json(users);
    } catch (err) {
      return response.status(404).json({ message: err.message });
    }
  }

  async index(request: Request, response: Response) {
    const usersServices = new UsersServices();

    try {
      const users = await usersServices.index();
      return response.json(users);
    } catch (err) {
      return response.status(404).json({ message: err.message });
    }
  }

  async show(request: Request, response: Response) {
    const usersServices = new UsersServices();
    //id parametro da rota = request.params.id
    const { id } = request.params;

    try {
      const users = await usersServices.show({ id });
      return response.json(users);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
  async delete(req: Request, res: Response) {
    const usersServices = new UsersServices();

    const { id } = req.params;

    try {
      await usersServices.delete({ id });
      return res.json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const usersServices = new UsersServices();

    const { id } = req.params;
    const { usuario, phone, email } = req.body;

    try {
      const users = await usersServices.update({ id, usuario, phone, email });
      return res.json({ message: "User updated successfully" });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export { UsersController };
