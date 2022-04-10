import { response, Router } from "express";
import multer from "multer"

import { CreateCategoryController } from 
"@modules/Cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from 
"@modules/Cars/useCases/listCategory/ListCategoriesController";
import { ImportCategoryController } from 
"@modules/Cars/useCases/importCategory/importCategoryController";

const categoriesRoutes = Router();

//configurações multer
const upload = multer({ dest: "./tmp" })

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import",upload.single("file"),importCategoryController.handle);

export { categoriesRoutes };