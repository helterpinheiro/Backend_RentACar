import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"
import { UsersRepository } from "@modules/Accounts/infra/repositories/UsersRepository";
import { AppError } from "@errors/AppError"

interface IPayload {
	sub: string;
}

export async function ensureAuthenticate(
	request: Request, 
	response: Response, 
	next: NextFunction) {

	const authHeader = request.headers.authorization;

	if(!authHeader) {
		throw new AppError("Token missing!!", 401);
	}

	const [, token] = authHeader.split(" ")
	
	try {
		const { sub: user_id } = verify(token, "c5e03019d32ac91392d85155a0df1ebb") as IPayload;

		const usersRepository = new UsersRepository();
		const user = usersRepository.findById(user_id);

		if(!user){
			throw new AppError("User not exists!!", 401)
		}

		request.user = {
			id: user_id
		}

		next();
	} catch {
		throw new AppError("Invalid token!!", 401)
	}


}