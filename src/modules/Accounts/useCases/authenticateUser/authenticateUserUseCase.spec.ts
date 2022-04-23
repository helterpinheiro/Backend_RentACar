import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemry";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
	});
	it("Should be able to authenticate a user", async () => {
		const user: ICreateUserDTO = {
			drive_license: "000000",
			email: "user@teste.com",
			password: "1234",
			name: "User Test"
		}

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token")
	});

	it("Should not be able to authenticate a nonexistent user", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "false@email.com",
				password: "1234",
			});
		}).rejects.toBeInstanceOf(AppError)
	});

	it("should not be able to authenticate with incorrect password", () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				drive_license: "9999",
				email: "user@user.com",
				password: "1234",
				name: "user Test Error"
			}

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: "incorrect_password"
			});
		}).rejects.toBeInstanceOf(AppError);
	})
})