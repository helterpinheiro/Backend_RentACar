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

  async create({name, email, drive_license, password, avatar, id}: ICreateUserDTO): Promise<void> {
      const user = this.repository.create({
        name,
        email,
        drive_license,
        password,
				avatar,
				id
      });

      await this.repository.save(user);
  }

	async findByEmail(email: string): Promise<User> {
			const user = await this.repository.findOne({email});
			return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.repository.findOne(id);
		return user;
	}
}

export { UsersRepository }