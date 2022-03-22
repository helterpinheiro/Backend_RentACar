//ORM
import { getRepository, Repository } from "typeorm";

//Repository and Interface
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";

//Entity
import { User } from '../../entities/User'


class UsersRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({name, email, drive_license, password}: ICreateUserDTO): Promise<void> {
      const user = this.repository.create({
        name,
        email,
        drive_license,
        password
      });

      await this.repository.save(user);
  }
}

export { UsersRepository }