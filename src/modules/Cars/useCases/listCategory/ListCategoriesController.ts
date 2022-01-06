import { Request, Response } from "express"

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {

  constructor(private listCategoriesUseCase: ListCategoriesUseCase){}

  handle(resquest: Request, response: Response) {
    const all = this.listCategoriesUseCase.execute();

    return response.status(201).json(all);
  }
}

export { ListCategoriesController } 