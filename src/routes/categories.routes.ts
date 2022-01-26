import { response, Router } from "express";
import multer from "multer"

import { createCategoryController } from "../modules/Cars/useCases/createCategory";
import { listCategoriesController } from "../modules/Cars/useCases/listCategory";
import { importCategoryController } from "../modules/Cars/useCases/importCategory";

const categoriesRoutes = Router();

//configurações multer
const upload = multer({dest: "./tmp"})

categoriesRoutes.post("/", (request, response) => {
 return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response)
})

categoriesRoutes.post("/import", upload.single("file"),(request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRoutes };