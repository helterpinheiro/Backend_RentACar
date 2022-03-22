import { container } from "tsyringe";

// Category Repository
import { ICategoriesRepository } from 
"../../modules/Cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from 
"../../modules/Cars/repositories/Implementations/CategoriesRepository"

// Specification Repository
import { ISpecificationsRepository } from 
"src/modules/Cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from
"../../modules/Cars/repositories/Implementations/SpecificationsRepository"

// User Repository
import { IUserRepository } from
"../../modules/Accounts/repositories/IUserRepository";
import { UsersRepository } from
"../../modules/Accounts/repositories/implementations/UsersRepository";


// CategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)
//SpecificationRepository
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationsRepository
)
//UsersRepository
container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
)