import { ICreateCategoryDTO } from "./ICategoriesRepository";

interface ICreateSpecificationDTO {
  name: string,
  description: string,
}

interface ISpecificationsRepository {

  create({ description, name }: ICreateCategoryDTO): void;
}

export {ISpecificationsRepository, ICreateSpecificationDTO};