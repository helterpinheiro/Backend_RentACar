import { inject, injectable, singleton } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from "../../../../errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string,
		email: string,
	},
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUserRepository
	){}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user  = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email or Password incorrect!!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("Email or Password incorrect!!");
		}

		const token = sign({}, "c5e03019d32ac91392d85155a0df1ebb", {
			subject: user.id,
			expiresIn: "1d"
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		}
		
		return tokenReturn  
	}
}

export { AuthenticateUserUseCase }