import { Router } from "express";
import multer from "multer";
import { UpdateUserAvatarController } from "@modules/Accounts/useCases/updateUserAvatar/updateUserAvatarController";
import { CreateUserController } from "@modules/Accounts/useCases/createUser/CreateUserController";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar",
	ensureAuthenticate,
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);

export { usersRoutes }